<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dealer;
use App\Models\Lead;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Http\JsonResponse;

class AdminAnalyticsController extends Controller
{
    /** GET /api/admin/analytics — platform-wide analytics. */
    public function index(): JsonResponse
    {
        // ---- KPIs ----
        $dealers    = Dealer::count();
        $vehicles   = Vehicle::count();
        $leads      = Lead::count();
        $activeSubs = User::where('subscription_status', 'active')->count();

        // ---- Growth: last 6 months (new dealers) + cumulative ----
        $start = now()->startOfMonth()->subMonths(5);
        $months = [];
        for ($i = 0; $i < 6; $i++) {
            $m = $start->copy()->addMonths($i);
            $months[$m->format('Y-m')] = ['month' => $m->format('M'), 'dealers' => 0];
        }
        foreach (Dealer::where('created_at', '>=', $start)->get(['created_at']) as $d) {
            $k = optional($d->created_at)->format('Y-m');
            if ($k && isset($months[$k])) {
                $months[$k]['dealers']++;
            }
        }
        $running = Dealer::where('created_at', '<', $start)->count();
        $growth = [];
        foreach ($months as $mm) {
            $running += $mm['dealers'];
            $growth[] = ['month' => $mm['month'], 'dealers' => $mm['dealers'], 'cumulative' => $running];
        }

        // ---- Geographic: dealers by state (top 7) ----
        $geographic = Dealer::selectRaw('state, count(*) as c')
            ->groupBy('state')
            ->orderByDesc('c')
            ->limit(7)
            ->get()
            ->map(fn ($r) => ['region' => $r->state ?: 'Unknown', 'dealers' => (int) $r->c]);

        // ---- Plan distribution (dealer owners) ----
        $buckets = ['Trial' => 0, 'Starter' => 0, 'Professional' => 0, 'Enterprise' => 0];
        foreach (User::where('role', 'dealer')->get(['plan', 'subscription_status']) as $u) {
            if ($u->subscription_status === 'trialing') {
                $buckets['Trial']++;
                continue;
            }
            $plan = ucfirst((string) ($u->plan ?: 'starter'));
            if (isset($buckets[$plan])) {
                $buckets[$plan]++;
            } else {
                $buckets['Starter']++;
            }
        }
        $planColors = ['Trial' => '#64748B', 'Starter' => '#3B82F6', 'Professional' => '#FC5E01', 'Enterprise' => '#8B5CF6'];
        $plans = [];
        foreach ($buckets as $name => $value) {
            if ($value > 0) {
                $plans[] = ['name' => $name, 'value' => $value, 'color' => $planColors[$name]];
            }
        }

        // ---- Top dealers by vehicles listed ----
        $topDealers = Dealer::withCount('vehicles')
            ->orderByDesc('vehicles_count')
            ->limit(5)
            ->get()
            ->map(fn ($d) => [
                'id'       => $d->id,
                'name'     => $d->name,
                'city'     => $d->city,
                'state'    => $d->state,
                'vehicles' => $d->vehicles_count,
                'leads'    => Lead::where('dealer_id', $d->id)->count(),
            ]);

        return response()->json([
            'success'     => true,
            'kpis'        => ['dealers' => $dealers, 'vehicles' => $vehicles, 'leads' => $leads, 'active_subs' => $activeSubs],
            'growth'      => $growth,
            'geographic'  => $geographic,
            'plans'       => $plans,
            'top_dealers' => $topDealers,
        ]);
    }
}