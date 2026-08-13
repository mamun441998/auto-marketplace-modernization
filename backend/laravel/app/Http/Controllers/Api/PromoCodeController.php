<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PromoCode;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PromoCodeController extends Controller
{
    /** GET /api/dealer/promo-codes — list all codes for the dealer. */
    public function index(Request $request): JsonResponse
    {
        $dealer = $request->user()->currentDealer();
        if (! $dealer) {
            return response()->json(['success' => false, 'message' => 'No dealership found.'], 404);
        }

        $codes = PromoCode::where('dealer_id', $dealer->id)
            ->orderByDesc('id')
            ->get()
            ->map(fn ($c) => $this->present($c));

        return response()->json(['success' => true, 'codes' => $codes]);
    }

    /** POST /api/dealer/promo-codes — create a new code. */
    public function store(Request $request): JsonResponse
    {
        $dealer = $request->user()->currentDealer();
        if (! $dealer) {
            return response()->json(['success' => false, 'message' => 'No dealership found.'], 404);
        }

        $data = $request->validate([
            'code' => [
                'required', 'string', 'max:40',
                Rule::unique('promo_codes')->where(fn ($q) => $q->where('dealer_id', $dealer->id)),
            ],
            'type'        => ['required', Rule::in(['percent', 'fixed'])],
            'value'       => ['required', 'numeric', 'min:0'],
            'max_uses'    => ['nullable', 'integer', 'min:1'],
            'expires_at'  => ['nullable', 'date'],
            'is_active'   => ['boolean'],
            'description' => ['nullable', 'string', 'max:200'],
        ]);

        // Percent discount can't exceed 100.
        if ($data['type'] === 'percent' && $data['value'] > 100) {
            return response()->json(['success' => false, 'message' => 'Percent discount cannot exceed 100.'], 422);
        }

        $code = PromoCode::create([
            'dealer_id'   => $dealer->id,
            'code'        => strtoupper(trim($data['code'])),
            'type'        => $data['type'],
            'value'       => $data['value'],
            'max_uses'    => $data['max_uses'] ?? null,
            'used_count'  => 0,
            'expires_at'  => $data['expires_at'] ?? null,
            'is_active'   => $data['is_active'] ?? true,
            'description' => $data['description'] ?? null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Promo code created.',
            'code'    => $this->present($code),
        ], 201);
    }

    /** PATCH /api/dealer/promo-codes/{promoCode}/toggle — enable/disable. */
    public function toggle(Request $request, PromoCode $promoCode): JsonResponse
    {
        $dealer = $request->user()->currentDealer();
        if (! $dealer || (int) $promoCode->dealer_id !== (int) $dealer->id) {
            return response()->json(['success' => false, 'message' => 'Not found'], 404);
        }

        $promoCode->update(['is_active' => ! $promoCode->is_active]);

        return response()->json([
            'success' => true,
            'code'    => $this->present($promoCode->fresh()),
        ]);
    }

    /** DELETE /api/dealer/promo-codes/{promoCode} — delete a code. */
    public function destroy(Request $request, PromoCode $promoCode): JsonResponse
    {
        $dealer = $request->user()->currentDealer();
        if (! $dealer || $promoCode->dealer_id !== $dealer->id) {
            return response()->json(['success' => false, 'message' => 'Not found'], 404);
        }

        $promoCode->delete();

        return response()->json(['success' => true, 'message' => 'Promo code deleted.']);
    }

    private function present(PromoCode $c): array
    {
        return [
            'id'          => $c->id,
            'code'        => $c->code,
            'type'        => $c->type,
            'value'       => (float) $c->value,
            'max_uses'    => $c->max_uses,
            'used_count'  => $c->used_count,
            'expires_at'  => optional($c->expires_at)->toDateString(),
            'is_active'   => $c->is_active,
            'redeemable'  => $c->isRedeemable(),
            'description' => $c->description,
            'created_at'  => optional($c->created_at)->toDateString(),
        ];
    }
}