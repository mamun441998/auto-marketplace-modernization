<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    /**
     * GET /api/plans  (public)
     * All plans for the pricing / billing page.
     */
    public function plans(): JsonResponse
    {
        return response()->json([
            'success'    => true,
            'trial_days' => (int) config('plans.trial_days', 14),
            'plans'      => config('plans.plans', []),
        ]);
    }

    /**
     * GET /api/subscription  (auth)
     * The logged-in dealer's current subscription/trial state + usage.
     */
    public function status(Request $request): JsonResponse
    {
        $user   = $request->user();
        $dealer = $user->currentDealer();

        $vehicleCount = $dealer
            ? Vehicle::where('dealer_id', $dealer->id)->count()
            : 0;

        $limit = $user->planLimit('vehicle_listings'); // null = unlimited

        return response()->json([
            'success' => true,
            'subscription' => [
                'plan'          => $user->plan,
                'active_plan'   => $user->activePlanKey(),
                'status'        => $user->subscription_status,
                'on_trial'      => $user->onTrial(),
                'has_access'    => $user->hasActiveAccess(),
                'trial_expired' => $user->isTrialExpired(),

                'trial_ends_at'        => optional($user->trial_ends_at)->toISOString(),
                'trial_days_left'      => $user->trialDaysLeft(),
                'subscription_ends_at' => optional($user->subscription_ends_at)->toISOString(),

                'plan_config' => $user->planConfig(),

                'usage' => [
                    'vehicle_listings' => $vehicleCount,
                    'vehicle_limit'    => $limit,
                    'vehicle_percent'  => $limit ? min(100, (int) round(($vehicleCount / $limit) * 100)) : 0,
                ],
            ],
        ]);
    }
}