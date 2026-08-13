<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DealerPaymentSetting;
use App\Models\Transaction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DealerPaymentController extends Controller
{
    /**
     * GET /api/dealer/payment-settings — the current dealer's gateway config.
     */
    public function show(Request $request): JsonResponse
    {
        $dealer = $request->user()->currentDealer();

        if (! $dealer) {
            return response()->json([
                'success' => false,
                'message' => 'You need a dealer profile first.',
            ], 422);
        }

        $settings = DealerPaymentSetting::firstWhere('dealer_id', $dealer->id);

        return response()->json([
            'success'  => true,
            'payment'  => [
                'stripeKey'      => $settings->stripe_secret_key ?? '',
                'stripeEnabled'  => (bool) ($settings->stripe_enabled ?? false),
                'paypalClientId' => $settings->paypal_client_id ?? '',
                'paypalEnabled'  => (bool) ($settings->paypal_enabled ?? false),
                'deposit'        => $settings && $settings->deposit_amount !== null ? (string) $settings->deposit_amount : '',
            ],
        ]);
    }

    /**
     * PUT /api/dealer/payment-settings — upsert the current dealer's config.
     */
    public function update(Request $request): JsonResponse
    {
        $dealer = $request->user()->currentDealer();

        if (! $dealer) {
            return response()->json([
                'success' => false,
                'message' => 'You need a dealer profile first.',
            ], 422);
        }

        $data = $request->validate([
            'stripeKey'      => ['nullable', 'string', 'max:255'],
            'stripeEnabled'  => ['boolean'],
            'paypalClientId' => ['nullable', 'string', 'max:255'],
            'paypalEnabled'  => ['boolean'],
            'deposit'        => ['nullable', 'numeric', 'min:0', 'max:9999999'],
        ]);

        DealerPaymentSetting::updateOrCreate(
            ['dealer_id' => $dealer->id],
            [
                'stripe_secret_key' => $data['stripeKey'] ?? null,
                'stripe_enabled'    => $data['stripeEnabled'] ?? false,
                'paypal_client_id'  => $data['paypalClientId'] ?? null,
                'paypal_enabled'    => $data['paypalEnabled'] ?? false,
                'deposit_amount'    => ($data['deposit'] ?? '') === '' ? null : $data['deposit'],
            ]
        );

        return response()->json([
            'success' => true,
            'message' => 'Payment settings saved.',
        ]);
    }

    /**
     * GET /api/dealer/transactions — the current dealer's payments + stats.
     */
    public function transactions(Request $request): JsonResponse
    {
        $dealer = $request->user()->currentDealer();

        if (! $dealer) {
            return response()->json([
                'success' => true,
                'stats'   => ['revenue' => 0, 'completed' => 0, 'pending' => 0, 'refunded' => 0],
                'transactions' => [],
            ]);
        }

        $rows = Transaction::query()
            ->where('dealer_id', $dealer->id)
            ->with('vehicle')
            ->orderByDesc('id')
            ->get();

        $list = $rows->map(fn ($t) => [
            'id'             => (int) $t->id,
            'customer_name'  => $t->customer_name ?: 'Guest',
            'customer_email' => $t->customer_email,
            'vehicle'        => $t->vehicle ? $this->vehicleLabel($t->vehicle) : '—',
            'amount'         => (float) $t->amount,
            'currency'       => $t->currency,
            'method'         => ucfirst($t->provider),
            'status'         => $t->status,
            'date'           => optional($t->paid_at ?? $t->created_at)->toIso8601String(),
        ]);

        $stats = [
            'revenue'   => (float) $rows->where('status', 'completed')->sum('amount'),
            'completed' => $rows->where('status', 'completed')->count(),
            'pending'   => $rows->where('status', 'pending')->count(),
            'refunded'  => $rows->where('status', 'refunded')->count(),
        ];

        return response()->json([
            'success'      => true,
            'stats'        => $stats,
            'transactions' => $list,
        ]);
    }

    private function vehicleLabel($vehicle): string
    {
        foreach (['title', 'name'] as $field) {
            if (! empty($vehicle->{$field})) {
                return (string) $vehicle->{$field};
            }
        }

        $parts = array_filter([
            $vehicle->year ?? null,
            $vehicle->make ?? null,
            $vehicle->model ?? null,
        ]);

        return $parts ? implode(' ', $parts) : 'Vehicle';
    }
}