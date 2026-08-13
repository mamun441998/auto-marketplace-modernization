<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Dealer;
use App\Models\Lead;
use App\Models\Vehicle;
use Illuminate\Http\JsonResponse;

class PublicStatsController extends Controller
{
    /** GET /api/stats — public platform-wide totals for the marketing page. */
    public function index(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'stats'   => [
                'dealers'  => Dealer::where('is_active', true)->count(),
                'vehicles' => Vehicle::count(),
                'leads'    => Lead::count(),
            ],
        ]);
    }
}