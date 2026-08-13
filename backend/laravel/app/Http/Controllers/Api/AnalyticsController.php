<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use App\Models\Contact;
use App\Models\Lead;
use App\Models\Vehicle;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AnalyticsController extends Controller
{
    /** GET /api/dealer/analytics — real dashboard insights for the current dealer. */
    public function overview(Request $request): JsonResponse
    {
        $dealer = $request->user()->currentDealer();
        if (! $dealer) {
            return response()->json(['success' => false, 'message' => 'No dealership found.'], 404);
        }

        $id = $dealer->id;

        /* ---------- Inventory ---------- */
        $vehicleStatuses = ['draft', 'active', 'pending', 'sold', 'archived'];
        $vehByStatusRaw = Vehicle::byDealer($id)
            ->selectRaw('status, count(*) as c')
            ->groupBy('status')
            ->pluck('c', 'status');

        $inventoryByStatus = [];
        foreach ($vehicleStatuses as $s) {
            $inventoryByStatus[$s] = (int) ($vehByStatusRaw[$s] ?? 0);
        }

        $totalVehicles = Vehicle::byDealer($id)->count();
        $activeValue   = (float) Vehicle::byDealer($id)->where('status', 'active')->sum('price');
        $avgPrice      = (float) Vehicle::byDealer($id)->where('status', 'active')->avg('price');
        $currency      = Vehicle::byDealer($id)->value('currency') ?: 'USD';

        $byMake = Vehicle::byDealer($id)
            ->selectRaw('make, count(*) as c')
            ->groupBy('make')
            ->orderByDesc('c')
            ->limit(6)
            ->get()
            ->map(fn ($r) => ['make' => $r->make ?: 'Unknown', 'count' => (int) $r->c]);

        /* ---------- Leads ---------- */
        $leadStatuses = ['new', 'contacted', 'qualified', 'closed', 'lost'];
        $leadByStatusRaw = Lead::byDealer($id)
            ->selectRaw('status, count(*) as c')
            ->groupBy('status')
            ->pluck('c', 'status');

        $leadsByStatus = [];
        foreach ($leadStatuses as $s) {
            $leadsByStatus[$s] = (int) ($leadByStatusRaw[$s] ?? 0);
        }

        $totalLeads = Lead::byDealer($id)->count();
        $wonLeads   = $leadsByStatus['closed'];
        $conversion = $totalLeads > 0 ? round(($wonLeads / $totalLeads) * 100, 1) : 0.0;

        // Leads over the last 30 days (gap-filled series).
        $since = now()->subDays(29)->startOfDay();
        $recentLeads = Lead::byDealer($id)
            ->where('created_at', '>=', $since)
            ->get(['created_at']);

        $daily = [];
        for ($i = 0; $i < 30; $i++) {
            $daily[$since->copy()->addDays($i)->format('Y-m-d')] = 0;
        }
        foreach ($recentLeads as $l) {
            $d = optional($l->created_at)->format('Y-m-d');
            if ($d && isset($daily[$d])) {
                $daily[$d]++;
            }
        }
        $leadsOverTime = [];
        foreach ($daily as $date => $count) {
            $leadsOverTime[] = ['date' => $date, 'count' => $count];
        }

        // Lead sources breakdown.
        $bySource = Lead::byDealer($id)
            ->selectRaw('source, count(*) as c')
            ->groupBy('source')
            ->orderByDesc('c')
            ->limit(6)
            ->get()
            ->map(fn ($r) => ['source' => $r->source ?: 'Direct', 'count' => (int) $r->c]);

        /* ---------- Contacts ---------- */
        $totalContacts = Contact::where('dealer_id', $id)->count();

        /* ---------- Marketing (email) ---------- */
        $emailBase = Campaign::where('dealer_id', $id)->where('channel', '!=', 'whatsapp');
        $emailsSent  = (int) (clone $emailBase)->sum('recipients_count');
        $totalOpens  = (int) (clone $emailBase)->sum('opens_count');
        $totalClicks = (int) (clone $emailBase)->sum('clicks_count');
        $openRate    = $emailsSent > 0 ? round(($totalOpens / $emailsSent) * 100, 1) : 0.0;
        $clickRate   = $emailsSent > 0 ? round(($totalClicks / $emailsSent) * 100, 1) : 0.0;

        $recentCampaigns = Campaign::where('dealer_id', $id)
            ->where('channel', '!=', 'whatsapp')
            ->where('status', 'sent')
            ->latest('sent_at')
            ->limit(5)
            ->get()
            ->map(fn ($c) => [
                'id'          => $c->id,
                'name'        => $c->name,
                'recipients'  => (int) $c->recipients_count,
                'opens'       => (int) $c->opens_count,
                'clicks'      => (int) $c->clicks_count,
                'open_rate'   => $c->recipients_count > 0 ? round(($c->opens_count / $c->recipients_count) * 100, 1) : 0.0,
                'sent_at'     => optional($c->sent_at)->toDateTimeString(),
            ]);

        /* ---------- Response ---------- */
        return response()->json([
            'success' => true,
            'totals'  => [
                'vehicles'     => $totalVehicles,
                'active'       => $inventoryByStatus['active'],
                'sold'         => $inventoryByStatus['sold'],
                'leads'        => $totalLeads,
                'contacts'     => $totalContacts,
                'emails_sent'  => $emailsSent,
                'total_opens'  => $totalOpens,
                'total_clicks' => $totalClicks,
                'open_rate'    => $openRate,
                'click_rate'   => $clickRate,
                'conversion'   => $conversion,
                'inventory_value' => $activeValue,
                'avg_price'    => round($avgPrice, 2),
                'currency'     => $currency,
            ],
            'inventory_by_status' => $inventoryByStatus,
            'leads_by_status'     => $leadsByStatus,
            'leads_over_time'     => $leadsOverTime,
            'leads_by_source'     => $bySource,
            'inventory_by_make'   => $byMake,
            'recent_campaigns'    => $recentCampaigns,
        ]);
    }
}