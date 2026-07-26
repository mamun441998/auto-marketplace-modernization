<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DealerDashboardController extends Controller
{
    /**
     * --------------------------------------------------------------------------
     * Dealer Dashboard
     * --------------------------------------------------------------------------
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'success' => true,

            'message' => 'Dealer dashboard loaded successfully.',

            'data' => [

                /*
                |--------------------------------------------------------------------------
                | Authenticated User
                |--------------------------------------------------------------------------
                */

                'user' => [
                    'id'    => $user->id,
                    'name'  => $user->name,
                    'email' => $user->email,
                ],

                /*
                |--------------------------------------------------------------------------
                | Statistics
                |--------------------------------------------------------------------------
                */

                'statistics' => [
                    'total_vehicles'      => 0,
                    'active_vehicles'     => 0,
                    'sold_vehicles'       => 0,
                    'draft_vehicles'      => 0,

                    'total_leads'         => 0,
                    'new_leads'           => 0,

                    'website_views'       => 0,

                    'subscription_status' => 'trial',
                    'trial_days_left'     => 14,
                ],

                /*
                |--------------------------------------------------------------------------
                | Recent Activity
                |--------------------------------------------------------------------------
                */

                'recent_activity' => [],

                /*
                |--------------------------------------------------------------------------
                | Notifications
                |--------------------------------------------------------------------------
                */

                'notifications' => [],

            ],
        ]);
    }
}