<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Models\SubscriptionPayment;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DealerSubscriptionController extends Controller
{
    /**
     * POST /api/dealer/subscription/checkout
     */
    public function checkout(Request $request): JsonResponse
    {
        $data = $request->validate([
            'plan'        => ['required', 'string', 'in:starter,professional,enterprise'],
            'success_url' => ['required', 'url'],
            'cancel_url'  => ['required', 'url'],
        ]);

        $user   = $request->user();
        $dealer = $user->currentDealer();

        if (! $dealer) {
            return response()->json([
                'success' => false,
                'message' => 'You need a dealer profile first.',
            ], 422);
        }

        $plan = config('plans.plans.' . $data['plan']);

        if (! $plan) {
            return response()->json(['success' => false, 'message' => 'Unknown plan.'], 422);
        }

        $platform  = json_decode((string) Setting::where('key', 'payment')->value('value'), true) ?? [];
        $stripeKey = $platform['stripeKey'] ?? null;
        $stripeOn  = $platform['stripeEnabled'] ?? false;

        if (! $stripeOn || ! $stripeKey) {
            return response()->json([
                'success' => false,
                'message' => 'Subscription billing is not available yet. Please try again later.',
            ], 422);
        }

        $amount = (float) $plan['price'];

        $payment = SubscriptionPayment::create([
            'dealer_id' => $dealer->id,
            'user_id'   => $user->id,
            'plan_key'  => $data['plan'],
            'amount'    => $amount,
            'currency'  => $plan['currency'] ?? 'USD',
            'provider'  => 'stripe',
            'status'    => 'pending',
        ]);

        try {
            $stripe = new \Stripe\StripeClient($stripeKey);

            $session = $stripe->checkout->sessions->create([
                'mode'           => 'payment',
                'success_url'    => $data['success_url'] . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url'     => $data['cancel_url'],
                'customer_email' => $user->email,
                'line_items'     => [[
                    'quantity'   => 1,
                    'price_data' => [
                        'currency'     => strtolower($plan['currency'] ?? 'usd'),
                        'unit_amount'  => (int) round($amount * 100),
                        'product_data' => [
                            'name'        => 'MotoHave ' . ($plan['name'] ?? $data['plan']) . ' plan',
                            'description' => 'Monthly subscription — ' . ($plan['name'] ?? ''),
                        ],
                    ],
                ]],
                'metadata' => [
                    'subscription_payment_id' => (string) $payment->id,
                    'dealer_id'               => (string) $dealer->id,
                    'plan'                    => $data['plan'],
                ],
            ]);
        } catch (\Throwable $e) {
            $payment->update(['status' => 'failed']);

            return response()->json([
                'success' => false,
                'message' => 'Could not start the checkout. Please try again later.',
            ], 502);
        }

        $payment->update(['provider_reference' => $session->id]);

        return response()->json(['success' => true, 'url' => $session->url]);
    }

    /**
     * GET /api/dealer/subscription/confirm?session_id=...
     */
    public function confirm(Request $request): JsonResponse
    {
        $sessionId = (string) $request->query('session_id');

        if ($sessionId === '') {
            return response()->json(['success' => false, 'message' => 'Missing session.'], 422);
        }

        $payment = SubscriptionPayment::firstWhere('provider_reference', $sessionId);

        if (! $payment) {
            return response()->json(['success' => false, 'message' => 'Payment not found.'], 404);
        }

        if ($payment->status === 'completed') {
            return response()->json(['success' => true, 'status' => 'completed', 'plan' => $payment->plan_key]);
        }

        $platform  = json_decode((string) Setting::where('key', 'payment')->value('value'), true) ?? [];
        $stripeKey = $platform['stripeKey'] ?? null;

        if (! $stripeKey) {
            return response()->json(['success' => false, 'message' => 'Billing configuration missing.'], 422);
        }

        try {
            $stripe  = new \Stripe\StripeClient($stripeKey);
            $session = $stripe->checkout->sessions->retrieve($sessionId);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => 'Could not verify the payment.'], 502);
        }

        if (($session->payment_status ?? null) === 'paid') {
            $payment->update([
                'status'     => 'completed',
                'paid_at'    => now(),
                'period_end' => now()->addMonth(),
            ]);

            $owner = User::find($payment->dealer->user_id ?? null);
            if ($owner) {
                $owner->plan                 = $payment->plan_key;
                $owner->subscription_status  = 'active';
                $owner->subscription_ends_at = $payment->period_end;
                $owner->save();
            }

            return response()->json(['success' => true, 'status' => 'completed', 'plan' => $payment->plan_key]);
        }

        return response()->json(['success' => true, 'status' => 'pending']);
    }
}