<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dealer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AdminDealerController extends Controller
{
    /** GET /api/admin/dealers — all dealers (any status) + search/filter. */
    public function index(Request $request): JsonResponse
    {
        $q = Dealer::with('user')->withCount('vehicles');

        if ($s = trim((string) $request->query('search', ''))) {
            $q->where(function ($w) use ($s) {
                $w->where('name', 'ilike', "%{$s}%")
                    ->orWhere('city', 'ilike', "%{$s}%")
                    ->orWhereHas('user', function ($u) use ($s) {
                        $u->where('email', 'ilike', "%{$s}%")->orWhere('name', 'ilike', "%{$s}%");
                    });
            });
        }

        $status = $request->query('status');
        if ($status && $status !== 'all') {
            $q->where('status', $status);
        }

        $dealers = $q->latest()->paginate(min((int) $request->query('per_page', 15), 50));

        return response()->json([
            'success' => true,
            'dealers' => collect($dealers->items())->map(fn ($d) => $this->present($d)),
            'meta'    => [
                'current_page' => $dealers->currentPage(),
                'last_page'    => $dealers->lastPage(),
                'per_page'     => $dealers->perPage(),
                'total'        => $dealers->total(),
            ],
        ]);
    }

    /** GET /api/admin/dealers/{dealer} — single dealer detail. */
    public function show(Request $request, Dealer $dealer): JsonResponse
    {
        $dealer->load('user')->loadCount('vehicles');
        return response()->json(['success' => true, 'dealer' => $this->present($dealer)]);
    }

    /** PATCH /api/admin/dealers/{dealer}/status — approve / suspend / set pending. */
    public function updateStatus(Request $request, Dealer $dealer): JsonResponse
    {
        $data = $request->validate([
            'status' => ['required', Rule::in(['active', 'pending', 'suspended'])],
        ]);

        $dealer->status = $data['status'];
        $dealer->is_active = $data['status'] !== 'suspended';
        $dealer->save();

        return response()->json([
            'success' => true,
            'message' => 'Dealer status updated.',
            'dealer'  => $this->present($dealer->fresh()->load('user')->loadCount('vehicles')),
        ]);
    }

    private function present(Dealer $d): array
    {
        return [
            'id'         => $d->id,
            'name'       => $d->name,
            'slug'       => $d->slug,
            'city'       => $d->city,
            'state'      => $d->state,
            'phone'      => $d->phone,
            'email'      => $d->email,
            'status'     => $d->status,
            'is_active'  => (bool) $d->is_active,
            'is_verified' => (bool) $d->is_verified,
            'vehicles'   => $d->vehicles_count ?? 0,
            'logo_url'   => $d->logo_url,
            'owner'      => $d->user ? [
                'id'    => $d->user->id,
                'name'  => $d->user->name,
                'email' => $d->user->email,
                'phone' => $d->user->phone,
            ] : null,
            'created_at' => optional($d->created_at)->toDateTimeString(),
        ];
    }
}