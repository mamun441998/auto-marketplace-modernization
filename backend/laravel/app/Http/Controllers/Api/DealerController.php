<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dealer\StoreDealerRequest;
use App\Http\Requests\Dealer\UpdateDealerRequest;

use App\Http\Resources\DealerResource;

use App\Models\Dealer;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

use Throwable;

class DealerController extends Controller
{
    /** List Dealers (Public) — search + filter + pagination */
    public function index(Request $request): JsonResponse
    {
        $query = Dealer::query()
            ->with('user')
            ->withCount('vehicles')
            ->where('is_active', true)
            ->where('status', 'active');

        if ($search = trim((string) $request->query('search'))) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('city', 'like', "%{$search}%")
                  ->orWhere('country', 'like', "%{$search}%");
            });
        }

        if ($request->filled('city')) {
            $query->where('city', $request->query('city'));
        }
        if ($request->boolean('verified')) {
            $query->where('is_verified', true);
        }
        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        $perPage = min((int) $request->query('per_page', 15), 50);
        $dealers = $query->latest()->paginate($perPage);

        return response()->json([
            'success' => true,
            'data'    => DealerResource::collection($dealers),
            'meta'    => [
                'current_page' => $dealers->currentPage(),
                'last_page'    => $dealers->lastPage(),
                'per_page'     => $dealers->perPage(),
                'total'        => $dealers->total(),
            ],
        ]);
    }

    /** Show Single Dealer (Public) */
    public function show(Dealer $dealer): JsonResponse
    {
        $dealer->load('user')->loadCount('vehicles');

        return response()->json([
            'success' => true,
            'data'    => new DealerResource($dealer),
        ]);
    }

    /** Current logged-in user's dealer (owner or team member). */
    public function myDealer(Request $request): JsonResponse
    {
        $dealer = $request->user()->currentDealer();

        if ($dealer) {
            $dealer->loadCount('vehicles');
        }

        return response()->json([
            'success' => true,
            'dealer'  => $dealer ? new DealerResource($dealer) : null,
        ]);
    }

    /** Create Dealer (Authenticated) */
    public function store(StoreDealerRequest $request): JsonResponse
    {
        $userId = $request->user()->id;

        if (Dealer::where('user_id', $userId)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'You already have a dealership registered.',
            ], 422);
        }

        DB::beginTransaction();

        try {
            $data = $request->validated();

            $data['user_id'] = $userId;
            $data['uuid']    = (string) Str::uuid();
            $data['slug']    = $this->uniqueSlug($data['name']);
            $data['status']    = 'active';
            $data['is_active'] = true;

            $dealer = Dealer::create($data);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Dealership created successfully.',
                'data'    => new DealerResource($dealer),
            ], 201);

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error('Dealer Store Error', [
                'user_id' => $userId,
                'message' => $e->getMessage(),
                'file'    => $e->getFile(),
                'line'    => $e->getLine(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Unable to create dealership.',
            ], 500);
        }
    }

    /** Update Dealer (Owner only) */
    public function update(UpdateDealerRequest $request, Dealer $dealer): JsonResponse
    {
        $this->authorizeOwner($request, $dealer);

        try {
            $dealer->update($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Dealership updated successfully.',
                'data'    => new DealerResource($dealer->fresh()),
            ]);

        } catch (Throwable $e) {
            Log::error('Dealer Update Error', [
                'dealer_id' => $dealer->id,
                'message'   => $e->getMessage(),
                'line'      => $e->getLine(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Unable to update dealership.',
            ], 500);
        }
    }

    /** PUT /api/dealer/settings — save custom domain + notification prefs. */
    public function updateSettings(Request $request): JsonResponse
    {
        $dealer = $request->user()->currentDealer();
        if (! $dealer) {
            return response()->json(['success' => false, 'message' => 'No dealership found.'], 404);
        }

        if ((int) $dealer->user_id !== (int) $request->user()->id) {
            return response()->json(['success' => false, 'message' => 'Only the owner can change settings.'], 403);
        }

        $data = $request->validate([
            'custom_domain'           => ['nullable', 'string', 'max:190'],
            'notifications'           => ['nullable', 'array'],
            'notifications.leads'     => ['boolean'],
            'notifications.inventory' => ['boolean'],
            'notifications.billing'   => ['boolean'],
        ]);

        if ($request->has('custom_domain')) {
            $dealer->custom_domain = $data['custom_domain'] ? trim($data['custom_domain']) : null;
        }
        if ($request->has('notifications')) {
            $dealer->notification_prefs = $data['notifications'];
        }
        $dealer->save();

        return response()->json([
            'success'       => true,
            'message'       => 'Settings saved.',
            'custom_domain' => $dealer->custom_domain,
            'notifications' => $dealer->notification_prefs,
        ]);
    }

    /** Delete Dealer (Owner only, soft delete) */
    public function destroy(Request $request, Dealer $dealer): JsonResponse
    {
        $this->authorizeOwner($request, $dealer);

        $dealer->delete();

        return response()->json([
            'success' => true,
            'message' => 'Dealership deleted successfully.',
        ]);
    }

    /** Upload Logo (Owner only) */
    public function uploadLogo(Request $request, Dealer $dealer): JsonResponse
    {
        $this->authorizeOwner($request, $dealer);

        $request->validate([
            'logo' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
        ]);

        if ($dealer->logo) {
            Storage::disk('public')->delete($dealer->logo);
        }

        $path = $request->file('logo')->store('dealers/logos', 'public');
        $dealer->update(['logo' => $path]);

        return response()->json([
            'success' => true,
            'message' => 'Logo uploaded successfully.',
            'data'    => new DealerResource($dealer->fresh()),
        ]);
    }

    /** Upload Cover Image (Owner only) */
    public function uploadCoverImage(Request $request, Dealer $dealer): JsonResponse
    {
        $this->authorizeOwner($request, $dealer);

        $request->validate([
            'cover_image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:10240'],
        ]);

        if ($dealer->cover_image) {
            Storage::disk('public')->delete($dealer->cover_image);
        }

        $path = $request->file('cover_image')->store('dealers/covers', 'public');
        $dealer->update(['cover_image' => $path]);

        return response()->json([
            'success' => true,
            'message' => 'Cover image uploaded successfully.',
            'data'    => new DealerResource($dealer->fresh()),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Helpers
    |--------------------------------------------------------------------------
    */

    private function authorizeOwner(Request $request, Dealer $dealer): void
    {
        if ((int) $dealer->user_id !== (int) $request->user()->id) {
            abort(403, 'You are not allowed to modify this dealership.');
        }
    }

    private function uniqueSlug(string $name): string
    {
        $base = Str::slug($name);
        $slug = $base ?: 'dealer';
        $i = 1;

        while (Dealer::withTrashed()->where('slug', $slug)->exists()) {
            $slug = $base . '-' . $i++;
        }

        return $slug;
    }
}