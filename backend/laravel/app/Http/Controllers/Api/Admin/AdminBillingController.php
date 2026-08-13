<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\SubscriptionPayment;
use Illuminate\Http\JsonResponse;

class AdminBillingController extends Controller
{
    /** GET /api/admin/billing — plans, subscriptions, revenue + real payments. */
    public function index(): JsonResponse
    {
        $dealerUsers = User::where('role', 'dealer')->with('dealer')->get();

        $subsByPlan = ['starter' => 0, 'professional' => 0, 'enterprise' => 0];
        $mrr = 0;
        $activeCount = 0;
        $trialing = 0;

        foreach ($dealerUsers as $u) {
            if ($u->hasActiveAccess()) {
                $k = $u->activePlanKey();
                if (isset($subsByPlan[$k])) {
                    $subsByPlan[$k]++;
                }
            }
            if ($u->subscription_status === 'active' && $u->subscriptionActive()) {
                $mrr += (int) config("plans.plans." . ($u->plan ?: 'starter') . ".price", 0);
                $activeCount++;
            } elseif ($u->onTrial()) {
                $trialing++;
            }
        }
        $avg = $activeCount ? (int) round($mrr / $activeCount) : 0;

        // Real money actually collected (completed subscription payments).
        $collected = (float) SubscriptionPayment::where('status', 'completed')->sum('amount');

        $labels = [
            'lead_management'    => 'Lead management & CRM',
            'website_builder'    => 'Website builder',
            'advanced_analytics' => 'Advanced analytics',
            'ai_pricing'         => 'AI vehicle pricing',
            'auto_auction'       => 'Auto auction access',
            'custom_erp'         => 'Custom ERP integration',
            'api_access'         => 'API access',
        ];

        $plans = [];
        foreach (config('plans.plans', []) as $key => $p) {
            $features = [];
            $vl = $p['vehicle_listings'];
            $features[] = $vl === null ? 'Unlimited vehicle listings' : "Up to {$vl} vehicle listings";
            $tm = $p['team_members'];
            $features[] = $tm === null ? 'Unlimited team members' : ($tm == 1 ? '1 team member' : "{$tm} team members");
            foreach ($labels as $fk => $label) {
                if (! empty($p['features'][$fk])) {
                    $features[] = $label;
                }
            }
            $features[] = ucfirst($p['support']) . ' support';

            $plans[] = [
                'key'         => $key,
                'name'        => $p['name'],
                'monthly'     => (int) $p['price'],
                'yearly'      => (int) $p['price'] * 10,
                'currency'    => $p['currency'] ?? 'USD',
                'subscribers' => $subsByPlan[$key] ?? 0,
                'features'    => $features,
            ];
        }

        $subscriptions = $dealerUsers->sortByDesc('id')->take(50)->values()->map(function ($u) {
            $trial = $u->onTrial();
            $k = $u->activePlanKey();
            $planName = config("plans.plans.$k.name", ucfirst($k));
            $price = (int) config("plans.plans.$k.price", 0);
            $status = $trial ? 'Trial' : ($u->subscription_status === 'active' ? 'Active' : ($u->subscription_status ?: 'None'));
            $renewal = $trial ? $u->trial_ends_at : $u->subscription_ends_at;

            return [
                'id'          => $u->id,
                'dealer_name' => $u->dealer?->name ?? $u->name,
                'plan'        => $planName,
                'cycle'       => 'Monthly',
                'amount'      => $trial ? 0 : $price,
                'renewal'     => optional($renewal)->toDateString(),
                'status'      => $status,
            ];
        });

        // Real payments (actual Stripe charges from dealers).
        $payments = SubscriptionPayment::query()
            ->where('status', 'completed')
            ->with('dealer:id,name')
            ->orderByDesc('id')
            ->take(50)
            ->get()
            ->map(fn ($p) => [
                'id'          => (int) $p->id,
                'dealer_name' => $p->dealer?->name ?? 'Unknown dealer',
                'plan'        => config("plans.plans.{$p->plan_key}.name", ucfirst($p->plan_key)),
                'amount'      => (float) $p->amount,
                'currency'    => $p->currency,
                'date'        => optional($p->paid_at ?? $p->created_at)->toIso8601String(),
            ]);

        return response()->json([
            'success' => true,
            'stats'   => [
                'mrr'       => $mrr,
                'active'    => $activeCount,
                'trialing'  => $trialing,
                'avg'       => $avg,
                'collected' => $collected,
                'currency'  => 'USD',
            ],
            'plans'         => $plans,
            'subscriptions' => $subscriptions,
            'payments'      => $payments,
        ]);
    }
}