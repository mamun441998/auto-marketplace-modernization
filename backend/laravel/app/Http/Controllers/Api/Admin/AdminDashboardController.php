<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dealer;
use App\Models\Lead;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    /** GET /api/admin/dashboard — platform-wide real stats. */
    public function index(Request $request): JsonResponse
    {
        // Totals
        $dealersTotal   = Dealer::count();
        $dealersActive  = Dealer::where('status', 'active')->where('is_active', true)->count();
        $dealersPending = Dealer::where('status', 'pending')->count();

        $usersTotal = User::count();
        $staffCount = User::whereIn('role', ['admin', 'super_admin'])->count();
        $dealerUsers = User::where('role', 'dealer')->count();

        $vehicles = Vehicle::count();
        $leads    = Lead::count();

        // Subscriptions
        $trialing   = User::where('subscription_status', 'trialing')->count();
        $activeSubs = User::where('subscription_status', 'active')->count();

        // Signups trend — last 30 days (dealers created)
        $since = now()->subDays(29)->startOfDay();
        $recent = Dealer::where('created_at', '>=', $since)->get(['created_at']);
        $daily = [];
        for ($i = 0; $i < 30; $i++) {
            $daily[$since->copy()->addDays($i)->format('Y-m-d')] = 0;
        }
        foreach ($recent as $d) {
            $k = optional($d->created_at)->format('Y-m-d');
            if ($k && isset($daily[$k])) {
                $daily[$k]++;
            }
        }
        $signupsTrend = [];
        foreach ($daily as $date => $count) {
            $signupsTrend[] = ['date' => $date, 'count' => $count];
        }

        // Recent dealers
        $recentDealers = Dealer::with('user')->withCount('vehicles')->latest()->limit(6)->get()
            ->map(fn ($d) => [
                'id'         => $d->id,
                'name'       => $d->name,
                'owner'      => $d->user?->name,
                'email'      => $d->user?->email,
                'city'       => $d->city,
                'status'     => $d->status,
                'is_active'  => (bool) $d->is_active,
                'vehicles'   => $d->vehicles_count,
                'created_at' => optional($d->created_at)->toDateString(),
            ]);

        return response()->json([
            'success' => true,
            'totals'  => [
                'dealers'         => $dealersTotal,
                'dealers_active'  => $dealersActive,
                'dealers_pending' => $dealersPending,
                'users'           => $usersTotal,
                'staff'           => $staffCount,
                'dealer_users'    => $dealerUsers,
                'vehicles'        => $vehicles,
                'leads'           => $leads,
                'trialing'        => $trialing,
                'active_subs'     => $activeSubs,
            ],
            'signups_trend'  => $signupsTrend,
            'recent_dealers' => $recentDealers,
        ]);
    }
}