<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dealer;
use App\Models\DealerWebsite;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminDomainController extends Controller
{
    /** GET /api/admin/domains — dealers with a custom domain set. */
    public function index(): JsonResponse
    {
        // Collect domains from dealers.custom_domain first, then dealer_websites.custom_domain.
        $map = [];

        foreach (Dealer::with('user')->whereNotNull('custom_domain')->where('custom_domain', '!=', '')->get() as $d) {
            $map[$d->id] = ['dealer' => $d, 'domain' => $d->custom_domain];
        }

        foreach (DealerWebsite::whereNotNull('custom_domain')->where('custom_domain', '!=', '')->get() as $w) {
            if (! isset($map[$w->dealer_id])) {
                $dealer = Dealer::with('user')->find($w->dealer_id);
                if ($dealer) {
                    $map[$w->dealer_id] = ['dealer' => $dealer, 'domain' => $w->custom_domain];
                }
            }
        }

        $publishedIds = DealerWebsite::where('is_published', true)->pluck('dealer_id')->flip();

        $domains = [];
        $live = 0;
        foreach ($map as $dealerId => $row) {
            $d = $row['dealer'];
            $published = $publishedIds->has($dealerId);
            if ($published) {
                $live++;
            }
            $domains[] = [
                'id'          => $d->id,
                'domain'      => $row['domain'],
                'dealer_name' => $d->name,
                'slug'        => $d->slug,
                'published'   => $published,
                'created_at'  => optional($d->created_at)->toDateString(),
            ];
        }

        return response()->json([
            'success' => true,
            'domains' => $domains,
            'stats'   => [
                'total'   => count($domains),
                'live'    => $live,
                'pending' => count($domains) - $live,
            ],
        ]);
    }

    /** DELETE /api/admin/domains/{dealer} — remove a dealer's custom domain. */
    public function remove(Request $request, Dealer $dealer): JsonResponse
    {
        $dealer->custom_domain = null;
        $dealer->save();

        DealerWebsite::where('dealer_id', $dealer->id)->update(['custom_domain' => null]);

        return response()->json(['success' => true, 'message' => 'Domain removed.']);
    }
}