<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DealerPaymentSetting;
use App\Models\Transaction;
use App\Models\Vehicle;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PaymentCheckoutController extends Controller
{
    /**
     * PUBLIC — POST /api/vehicles/{vehicle}/checkout
     * Creates a Stripe Checkout Session for a reservation deposit using the
     * dealer's OWN Stripe secret key. The amount is computed server-side.
     */
    public function create(Request $request, Vehicle $vehicle): JsonResponse
    {
        $data = $request->validate([
            'customer_name'  => ['nullable', 'string', 'max:255'],
            'customer_email' => ['nullable', 'email', 'max:255'],
            'success_url'    => ['required', 'url'],
            'cancel_url'     => ['required', 'url'],
        ]);

        $settings = DealerPaymentSetting::firstWhere('dealer_id', $vehicle->dealer_id);

        if (! $settings || ! $settings->stripe_enabled || ! $settings->stripe_secret_key) {
            return response()->json([
                'success' => false,
                'message' => 'Online payments are not available for this dealer yet.',
            ], 422);
        }

        // Deposit = configured flat amount, else 5% of the vehicle price.
        $price   = (float) ($vehicle->price ?? 0);
        $deposit = $settings->deposit_amount !== null
            ? (float) $settings->deposit_amount
            : round($price * 0.05, 2);

        // Stripe requires a minimum charge (~$0.50). Guard it.
        if ($deposit < 1) {
            $deposit = $price > 0 ? min($price, 1.0) : 0;
        }

        if ($deposit <= 0) {
            return response()->json([
                'success' => false,
                'message' => 'A deposit amount could not be determined for this vehicle.',
            ], 422);
        }

        $label = $this->vehicleLabel($vehicle);

        // Record a pending transaction first.
        $transaction = Transaction::create([
            'dealer_id'      => $vehicle->dealer_id,
            'vehicle_id'     => $vehicle->id,
            'customer_name'  => $data['customer_name'] ?? null,
            'customer_email' => $data['customer_email'] ?? null,
            'amount'         => $deposit,
            'currency'       => 'USD',
            'provider'       => 'stripe',
            'status'         => 'pending',
        ]);

        try {
            $stripe = new \Stripe\StripeClient($settings->stripe_secret_key);

            $session = $stripe->checkout->sessions->create([
                'mode'                 => 'payment',
                'success_url'          => $data['success_url'] . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url'           => $data['cancel_url'],
                'customer_email'       => $data['customer_email'] ?? null,
                'line_items'           => [[
                    'quantity'   => 1,
                    'price_data' => [
                        'currency'     => 'usd',
                        'unit_amount'  => (int) round($deposit * 100), // cents
                        'product_data' => [
                            'name'        => 'Reservation deposit — ' . $label,
                            'description' => 'Deposit to reserve this vehicle.',
                        ],
                    ],
                ]],
                'metadata' => [
                    'transaction_id' => (string) $transaction->id,
                    'dealer_id'      => (string) $vehicle->dealer_id,
                    'vehicle_id'     => (string) $vehicle->id,
                ],
            ]);
        } catch (\Throwable $e) {
            $transaction->update(['status' => 'failed']);

            return response()->json([
                'success' => false,
                'message' => 'Could not start the payment. Please try again later.',
            ], 502);
        }

        $transaction->update(['provider_reference' => $session->id]);

        return response()->json([
            'success' => true,
            'url'     => $session->url,
        ]);
    }

    /**
     * PUBLIC — GET /api/checkout/confirm?session_id=...
     * After the customer returns from Stripe, verify the session with the
     * dealer's key and mark the transaction completed if it was paid.
     */
    public function confirm(Request $request): JsonResponse
    {
        $sessionId = (string) $request->query('session_id');

        if ($sessionId === '') {
            return response()->json(['success' => false, 'message' => 'Missing session.'], 422);
        }

        $transaction = Transaction::firstWhere('provider_reference', $sessionId);

        if (! $transaction) {
            return response()->json(['success' => false, 'message' => 'Transaction not found.'], 404);
        }

        // Already confirmed earlier.
        if ($transaction->status === 'completed') {
            return response()->json(['success' => true, 'status' => 'completed']);
        }

        $settings = DealerPaymentSetting::firstWhere('dealer_id', $transaction->dealer_id);

        if (! $settings || ! $settings->stripe_secret_key) {
            return response()->json(['success' => false, 'message' => 'Dealer configuration missing.'], 422);
        }

        try {
            $stripe  = new \Stripe\StripeClient($settings->stripe_secret_key);
            $session = $stripe->checkout->sessions->retrieve($sessionId);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => 'Could not verify the payment.'], 502);
        }

        if (($session->payment_status ?? null) === 'paid') {
            $transaction->update([
                'status'  => 'completed',
                'paid_at' => now(),
            ]);

            return response()->json(['success' => true, 'status' => 'completed']);
        }

        return response()->json(['success' => true, 'status' => 'pending']);
    }

    private function vehicleLabel(Vehicle $vehicle): string
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