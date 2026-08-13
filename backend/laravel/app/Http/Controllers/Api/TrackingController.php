<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TrackingController extends Controller
{
    /**
     * GET /track/open/{campaign} — invisible 1x1 pixel.
     * Increments the campaign's open count when an email client loads the image.
     */
    public function open(Campaign $campaign): Response
    {
        // Increment without touching updated_at.
        $campaign->increment('opens_count');

        // 1x1 transparent GIF.
        $gif = base64_decode('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');

        return response($gif, 200, [
            'Content-Type'  => 'image/gif',
            'Cache-Control' => 'no-store, no-cache, must-revalidate, max-age=0',
            'Pragma'        => 'no-cache',
        ]);
    }

    /**
     * GET /track/click/{campaign}?url=... — increments click count, then redirects.
     */
    public function click(Request $request, Campaign $campaign)
    {
        $url = (string) $request->query('url', '');

        // Only allow real http(s) destinations (prevents open-redirect abuse).
        if ($url === '' || ! preg_match('#^https?://#i', $url) || ! filter_var($url, FILTER_VALIDATE_URL)) {
            return redirect('/');
        }

        $campaign->increment('clicks_count');

        return redirect()->away($url);
    }
}