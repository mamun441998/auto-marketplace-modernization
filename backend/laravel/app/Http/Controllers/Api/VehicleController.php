<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Vehicle\StoreVehicleRequest;
use App\Http\Requests\Vehicle\UpdateVehicleRequest;
use App\Http\Resources\VehicleResource;
use App\Models\Dealer;
use App\Models\Vehicle;
use App\Models\VehicleImage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class VehicleController extends Controller
{
    /**
     * Statuses that are visible on the public marketplace.
     * Must exist in the vehicles enum: draft, active, pending, sold, archived.
     */
    private const PUBLIC_STATUSES = ['active', 'pending', 'sold'];

    /* =====================================================================
     |  PUBLIC ENDPOINTS
     |=====================================================================*/

    public function index(Request $request): JsonResponse
    {
        $query = $this->buildVehicleQuery($request);

        $query->whereIn('status', self::PUBLIC_STATUSES);

        $perPage = (int) $request->integer('per_page', 15);
        $perPage = max(1, min($perPage, 50));

        $vehicles = $query->paginate($perPage)->withQueryString();

        return response()->json([
            'success'  => true,
            'vehicles' => VehicleResource::collection($vehicles),
            'meta'     => [
                'current_page' => $vehicles->currentPage(),
                'last_page'    => $vehicles->lastPage(),
                'per_page'     => $vehicles->perPage(),
                'total'        => $vehicles->total(),
            ],
        ]);
    }

    public function show(Vehicle $vehicle): JsonResponse
    {
        if (! in_array($vehicle->status, self::PUBLIC_STATUSES, true)) {
            return response()->json([
                'success' => false,
                'message' => 'Vehicle not found.',
            ], Response::HTTP_NOT_FOUND);
        }

        $vehicle->load(['images', 'dealer', 'inventorySource']);

        return response()->json([
            'success' => true,
            'vehicle' => new VehicleResource($vehicle),
        ]);
    }

    /* =====================================================================
     |  DEALER (AUTHENTICATED) ENDPOINTS
     |=====================================================================*/

    public function dealerVehicles(Request $request): JsonResponse
    {
        $dealer = $this->getDealer($request);

        if (! $dealer) {
            return $this->noDealerResponse();
        }

        $query = $this->buildVehicleQuery($request)
            ->where('dealer_id', $dealer->id);

        $perPage = (int) $request->integer('per_page', 15);
        $perPage = max(1, min($perPage, 50));

        $vehicles = $query->paginate($perPage)->withQueryString();

        return response()->json([
            'success'  => true,
            'vehicles' => VehicleResource::collection($vehicles),
            'meta'     => [
                'current_page' => $vehicles->currentPage(),
                'last_page'    => $vehicles->lastPage(),
                'per_page'     => $vehicles->perPage(),
                'total'        => $vehicles->total(),
            ],
        ]);
    }

    public function store(StoreVehicleRequest $request): JsonResponse
    {
        $dealer = $this->getDealer($request);

        if (! $dealer) {
            return $this->noDealerResponse();
        }

        $data = $request->validated();

        try {
            $vehicle = DB::transaction(function () use ($data, $dealer, $request) {
                $vehicle = new Vehicle();
                $vehicle->fill($this->fillableVehicleData($data));
                $vehicle->uuid      = (string) Str::uuid();
                $vehicle->dealer_id = $dealer->id;
                $vehicle->slug      = $this->createVehicleSlug(
                    $data['title'] ?? ($data['make'] . ' ' . $data['model'])
                );

                if (($vehicle->status ?? 'draft') === 'active') {
                    $vehicle->published_at = now();
                }

                $vehicle->save();

                if ($request->hasFile('images')) {
                    $this->uploadVehicleImages(
                        $vehicle,
                        $request->file('images'),
                        $request->input('featured_image')
                    );
                }

                return $vehicle;
            });
        } catch (\Throwable $e) {
            Log::error('Vehicle creation failed', [
                'dealer_id' => $dealer->id,
                'error'     => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to create vehicle. Please try again.',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $vehicle->load(['images', 'dealer']);

        return response()->json([
            'success' => true,
            'message' => 'Vehicle created successfully.',
            'vehicle' => new VehicleResource($vehicle),
        ], Response::HTTP_CREATED);
    }

    public function edit(Request $request, Vehicle $vehicle): JsonResponse
    {
        $dealer = $this->getDealer($request);

        if (! $dealer) {
            return $this->noDealerResponse();
        }

        if ($denied = $this->authorizeDealer($dealer, $vehicle)) {
            return $denied;
        }

        $vehicle->load(['images', 'dealer', 'inventorySource']);

        return response()->json([
            'success' => true,
            'vehicle' => new VehicleResource($vehicle),
        ]);
    }

    public function update(UpdateVehicleRequest $request, Vehicle $vehicle): JsonResponse
    {
        $dealer = $this->getDealer($request);

        if (! $dealer) {
            return $this->noDealerResponse();
        }

        if ($denied = $this->authorizeDealer($dealer, $vehicle)) {
            return $denied;
        }

        $data = $request->validated();

        try {
            DB::transaction(function () use ($vehicle, $data) {
                $wasActive = $vehicle->status === 'active';

                $vehicle->fill($this->fillableVehicleData($data));

                if (array_key_exists('title', $data) && $data['title'] !== $vehicle->getOriginal('title')) {
                    $vehicle->slug = $this->createVehicleSlug($data['title'], $vehicle->id);
                }

                if (array_key_exists('status', $data)) {
                    if ($data['status'] === 'active' && ! $wasActive) {
                        $vehicle->published_at = now();
                    } elseif ($data['status'] !== 'active') {
                        $vehicle->published_at = null;
                    }
                }

                $vehicle->save();
            });
        } catch (\Throwable $e) {
            Log::error('Vehicle update failed', [
                'vehicle_id' => $vehicle->id,
                'error'      => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to update vehicle. Please try again.',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'success' => true,
            'message' => 'Vehicle updated successfully.',
            'vehicle' => new VehicleResource($vehicle->fresh(['images', 'dealer'])),
        ]);
    }

    public function destroy(Request $request, Vehicle $vehicle): JsonResponse
    {
        $dealer = $this->getDealer($request);

        if (! $dealer) {
            return $this->noDealerResponse();
        }

        if ($denied = $this->authorizeDealer($dealer, $vehicle)) {
            return $denied;
        }

        try {
            $vehicle->delete();
        } catch (\Throwable $e) {
            Log::error('Vehicle deletion failed', [
                'vehicle_id' => $vehicle->id,
                'error'      => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete vehicle. Please try again.',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'success' => true,
            'message' => 'Vehicle deleted successfully.',
        ]);
    }

    /* =====================================================================
     |  IMAGE ENDPOINTS
     |=====================================================================*/

    public function uploadImages(Request $request, Vehicle $vehicle): JsonResponse
    {
        $dealer = $this->getDealer($request);

        if (! $dealer) {
            return $this->noDealerResponse();
        }

        if ($denied = $this->authorizeDealer($dealer, $vehicle)) {
            return $denied;
        }

        $request->validate([
            'images'         => ['required', 'array', 'max:20'],
            'images.*'       => ['file', 'mimes:jpg,jpeg,png,webp,avif,gif,bmp', 'max:5120'],
            'featured_image' => ['nullable', 'integer', 'min:0'],
        ]);

        try {
            DB::transaction(function () use ($vehicle, $request) {
                $this->uploadVehicleImages(
                    $vehicle,
                    $request->file('images'),
                    $request->input('featured_image')
                );
            });
        } catch (\Throwable $e) {
            Log::error('Vehicle image upload failed', [
                'vehicle_id' => $vehicle->id,
                'error'      => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to upload images. Please try again.',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'success' => true,
            'message' => 'Images uploaded successfully.',
            'vehicle' => new VehicleResource($vehicle->fresh(['images', 'dealer'])),
        ], Response::HTTP_CREATED);
    }

    public function deleteImage(Request $request, VehicleImage $image): JsonResponse
    {
        $dealer = $this->getDealer($request);

        if (! $dealer) {
            return $this->noDealerResponse();
        }

        $vehicle = $image->vehicle;

        if (! $vehicle) {
            return response()->json([
                'success' => false,
                'message' => 'Vehicle not found for this image.',
            ], Response::HTTP_NOT_FOUND);
        }

        if ($denied = $this->authorizeDealer($dealer, $vehicle)) {
            return $denied;
        }

        try {
            DB::transaction(function () use ($vehicle, $image) {
                $wasFeatured = (bool) $image->is_featured;

                $this->deleteVehicleImageFromStorage($image->image_path);
                $image->delete();

                if ($wasFeatured) {
                    $next = $vehicle->images()->first();
                    if ($next) {
                        $next->update(['is_featured' => true]);
                    }
                }
            });
        } catch (\Throwable $e) {
            Log::error('Vehicle image deletion failed', [
                'image_id' => $image->id,
                'error'    => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete image. Please try again.',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'success' => true,
            'message' => 'Image deleted successfully.',
            'vehicle' => new VehicleResource($vehicle->fresh(['images', 'dealer'])),
        ]);
    }

    public function setFeaturedImage(Request $request, Vehicle $vehicle, VehicleImage $image): JsonResponse
    {
        $dealer = $this->getDealer($request);

        if (! $dealer) {
            return $this->noDealerResponse();
        }

        if ($denied = $this->authorizeDealer($dealer, $vehicle)) {
            return $denied;
        }

        if ((int) $image->vehicle_id !== (int) $vehicle->id) {
            return response()->json([
                'success' => false,
                'message' => 'Image does not belong to this vehicle.',
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            DB::transaction(function () use ($vehicle, $image) {
                $vehicle->images()->update(['is_featured' => false]);
                $image->update(['is_featured' => true]);
            });
        } catch (\Throwable $e) {
            Log::error('Set featured image failed', [
                'vehicle_id' => $vehicle->id,
                'image_id'   => $image->id,
                'error'      => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to set featured image. Please try again.',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'success' => true,
            'message' => 'Featured image updated successfully.',
            'vehicle' => new VehicleResource($vehicle->fresh(['images', 'dealer'])),
        ]);
    }

    /* =====================================================================
     |  PRIVATE HELPERS
     |=====================================================================*/

    private function getDealer(Request $request): ?Dealer
    {
        return Dealer::where('user_id', $request->user()->id)->first();
    }

    private function authorizeDealer(Dealer $dealer, Vehicle $vehicle): ?JsonResponse
    {
        if ((int) $vehicle->dealer_id !== (int) $dealer->id) {
            return response()->json([
                'success' => false,
                'message' => 'You are not allowed to access this vehicle.',
            ], Response::HTTP_FORBIDDEN);
        }

        return null;
    }

    private function noDealerResponse(): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => 'No dealership profile found. Please create your dealership first.',
        ], Response::HTTP_FORBIDDEN);
    }

    private function buildVehicleQuery(Request $request)
    {
        $query = Vehicle::query()->with(['images', 'dealer']);

        if ($request->filled('search')) {
            $query->search($request->string('search'));
        }

        foreach (['make', 'model', 'fuel_type', 'transmission', 'condition', 'body_type'] as $field) {
            if ($request->filled($field)) {
                $query->where($field, $request->input($field));
            }
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('year_min')) {
            $query->where('year', '>=', (int) $request->input('year_min'));
        }
        if ($request->filled('year_max')) {
            $query->where('year', '<=', (int) $request->input('year_max'));
        }

        if ($request->filled('price_min')) {
            $query->where('price', '>=', (float) $request->input('price_min'));
        }
        if ($request->filled('price_max')) {
            $query->where('price', '<=', (float) $request->input('price_max'));
        }

        $sortable = ['created_at', 'price', 'year', 'mileage', 'title'];
        $sortBy   = in_array($request->input('sort_by'), $sortable, true)
            ? $request->input('sort_by')
            : 'created_at';
        $sortDir  = strtolower($request->input('sort_dir')) === 'asc' ? 'asc' : 'desc';

        $query->orderBy($sortBy, $sortDir);

        return $query;
    }

    private function createVehicleSlug(string $title, ?int $ignoreId = null): string
    {
        $base = Str::slug($title) ?: 'vehicle';
        $slug = $base;
        $i    = 1;

        while (
            Vehicle::withTrashed()
                ->where('slug', $slug)
                ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $slug = $base . '-' . $i++;
        }

        return $slug;
    }

    private function uploadVehicleImages(Vehicle $vehicle, array $files, ?int $featuredIndex = null): void
    {
        $startOrder    = (int) $vehicle->images()->max('sort_order');
        $hasFeatured   = $vehicle->images()->where('is_featured', true)->exists();
        $featuredIndex = is_null($featuredIndex) ? null : (int) $featuredIndex;

        foreach (array_values($files) as $i => $file) {
            if (! $file instanceof UploadedFile) {
                continue;
            }

            $path = $file->store("vehicles/{$vehicle->id}", 'public');

            $isFeatured = false;
            if (! is_null($featuredIndex)) {
                $isFeatured = ($i === $featuredIndex);
            } elseif (! $hasFeatured && $i === 0) {
                $isFeatured = true;
            }

            if ($isFeatured) {
                $vehicle->images()->update(['is_featured' => false]);
                $hasFeatured = true;
            }

            VehicleImage::create([
                'vehicle_id'   => $vehicle->id,
                'image_path'   => $path,
                'alt_text'     => $vehicle->full_name ?? $vehicle->title,
                'is_featured'  => $isFeatured,
                'sort_order'   => $startOrder + $i + 1,
                'image_source' => 'upload',
            ]);
        }
    }

    private function deleteVehicleImageFromStorage(?string $path): void
    {
        if ($path && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }

    private function fillableVehicleData(array $data): array
    {
        return collect($data)->only([
            'title', 'description', 'vin', 'make', 'model', 'year',
            'price', 'currency', 'mileage', 'fuel_type', 'transmission',
            'condition', 'body_type', 'color', 'status', 'inventory_source_id',
        ])->toArray();
    }
}