<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Dealer;
use App\Models\DealerWebsite;
use App\Models\Vehicle;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class DealerWebsiteController extends Controller
{
    /* =====================================================================
     |  DEALER (AUTHENTICATED)
     |=====================================================================*/

    /** GET /api/dealer/website — load (or auto-create) the dealer's website. */
    public function mySite(Request $request): JsonResponse
    {
        $dealer = $this->getDealer($request);
        if (! $dealer) {
            return $this->noDealerResponse();
        }

        $site = DealerWebsite::firstOrCreate(
            ['dealer_id' => $dealer->id],
            ['config' => DealerWebsite::defaultConfig(), 'is_published' => false]
        );

        return response()->json([
            'success' => true,
            'website' => $this->present($site, $dealer),
        ]);
    }

    /** PUT /api/dealer/website — save the website config + tracking ids. */
    public function update(Request $request): JsonResponse
    {
        $dealer = $this->getDealer($request);
        if (! $dealer) {
            return $this->noDealerResponse();
        }

        $validated = $request->validate([
            'config'              => ['required', 'array'],
            'meta_pixel_id'       => ['nullable', 'string', 'max:100'],
            'google_analytics_id' => ['nullable', 'string', 'max:100'],
            'custom_domain'       => ['nullable', 'string', 'max:255'],
        ]);

        try {
            $site = DealerWebsite::firstOrCreate(
                ['dealer_id' => $dealer->id],
                ['config' => DealerWebsite::defaultConfig()]
            );

            $config = $validated['config'];
            $config['tracking'] = array_merge($config['tracking'] ?? [], [
                'metaPixelId'       => $validated['meta_pixel_id'] ?? null,
                'googleAnalyticsId' => $validated['google_analytics_id'] ?? null,
            ]);

            $site->update([
                'config'              => $config,
                'meta_pixel_id'       => $validated['meta_pixel_id'] ?? null,
                'google_analytics_id' => $validated['google_analytics_id'] ?? null,
                'custom_domain'       => $validated['custom_domain'] ?? $site->custom_domain,
            ]);
        } catch (\Throwable $e) {
            Log::error('Website update failed', ['dealer_id' => $dealer->id, 'error' => $e->getMessage()]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to save website. Please try again.',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'success' => true,
            'message' => 'Website saved successfully.',
            'website' => $this->present($site->fresh(), $dealer),
        ]);
    }

    /** PATCH /api/dealer/website/publish — publish / unpublish. */
    public function publish(Request $request): JsonResponse
    {
        $dealer = $this->getDealer($request);
        if (! $dealer) {
            return $this->noDealerResponse();
        }

        $validated = $request->validate([
            'is_published' => ['required', 'boolean'],
        ]);

        $site = DealerWebsite::firstOrCreate(
            ['dealer_id' => $dealer->id],
            ['config' => DealerWebsite::defaultConfig()]
        );

        $site->update(['is_published' => $validated['is_published']]);

        return response()->json([
            'success' => true,
            'message' => $validated['is_published'] ? 'Website is now live.' : 'Website unpublished.',
            'website' => $this->present($site->fresh(), $dealer),
        ]);
    }

    /** POST /api/dealer/website/upload — upload an image asset → returns public URL. */
    public function uploadAsset(Request $request): JsonResponse
    {
        $dealer = $this->getDealer($request);
        if (! $dealer) {
            return $this->noDealerResponse();
        }

        $request->validate([
            'image' => ['required', 'file', 'mimes:jpg,jpeg,png,webp,avif,gif,svg', 'max:5120'],
        ]);

        $path = $request->file('image')->store("websites/{$dealer->id}", 'public');

        return response()->json([
            'success' => true,
            'url'     => url('media/' . $path),
            'path'    => $path,
        ]);
    }

    /* =====================================================================
     |  PUBLIC — the live dealer site
     |=====================================================================*/

    /** GET /api/sites/{slug} — the live website for a dealer slug (must be published). */
    public function showBySlug(string $slug): JsonResponse
    {
        $dealer = Dealer::where('slug', $slug)->first();

        if (! $dealer) {
            return response()->json(['success' => false, 'message' => 'Website not found.'], Response::HTTP_NOT_FOUND);
        }

        $site = DealerWebsite::where('dealer_id', $dealer->id)->first();

        if (! $site || ! $site->is_published) {
            return response()->json(['success' => false, 'message' => 'This website is not live yet.'], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'website' => $this->present($site, $dealer, true),
        ]);
    }

    /**
     * GET /api/sites/resolve-domain?domain=...
     * Map a custom domain → dealer slug (used by the frontend custom-domain middleware).
     * Checks both dealers.custom_domain and dealer_websites.custom_domain.
     */
    public function resolveDomain(Request $request): JsonResponse
    {
        $domain = strtolower(trim((string) $request->query('domain', '')));
        $domain = preg_replace('#^https?://#', '', $domain);
        $domain = preg_replace('#^www\.#', '', $domain);
        $domain = rtrim($domain, '/');

        if ($domain === '') {
            return response()->json(['success' => false], Response::HTTP_NOT_FOUND);
        }

        // Domain can be stored on the dealer OR on the dealer_website.
        $dealer = Dealer::where('custom_domain', $domain)->first();

        if (! $dealer) {
            $site = DealerWebsite::where('custom_domain', $domain)->first();
            if ($site) {
                $dealer = Dealer::find($site->dealer_id);
            }
        }

        if (! $dealer) {
            return response()->json(['success' => false], Response::HTTP_NOT_FOUND);
        }

        // Only resolve if the site is published.
        $site = DealerWebsite::where('dealer_id', $dealer->id)->first();
        if (! $site || ! $site->is_published) {
            return response()->json(['success' => false], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'slug'    => $dealer->slug,
        ]);
    }

    /* =====================================================================
     |  HELPERS
     |=====================================================================*/

    private function present(DealerWebsite $site, Dealer $dealer, bool $public = false): array
    {
        return [
            'is_published'        => $site->is_published,
            'custom_domain'       => $site->custom_domain,
            'meta_pixel_id'       => $site->meta_pixel_id,
            'google_analytics_id' => $site->google_analytics_id,
            'config'              => $site->config ?? DealerWebsite::defaultConfig(),
            'dealer'              => [
                'id'              => $dealer->id,
                'name'            => $dealer->name,
                'slug'            => $dealer->slug,
                'email'           => $dealer->email,
                'phone'           => $dealer->phone,
                'city'            => $dealer->city,
                'address'         => $dealer->address,
                'logo_url'        => $dealer->logo_url,
                'cover_image_url' => $dealer->cover_image_url,
            ],
            'preview_url'         => rtrim(config('app.frontend_url', env('FRONTEND_URL', 'http://127.0.0.1:3000')), '/') . '/s/' . $dealer->slug,
        ];
    }

    private function getDealer(Request $request): ?Dealer
    {
        return $request->user()->currentDealer();
    }

    private function noDealerResponse(): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => 'No dealership profile found. Please create your dealership first.',
        ], Response::HTTP_FORBIDDEN);
    }
}