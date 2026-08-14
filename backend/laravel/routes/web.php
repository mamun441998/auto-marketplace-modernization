<?php
use App\Http\Controllers\Api\TrackingController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

// API backend root — a lightweight health/status response. (The default
// welcome view uses @vite, whose manifest doesn't exist in an API-only
// deploy, so rendering it would 500. This app serves JSON under /api/*.)
Route::get('/', function () {
    return response()->json([
        'app'    => config('app.name'),
        'status' => 'ok',
        'api'    => url('/api'),
    ]);
});

// Email open / click tracking (public — hit by email clients & browsers)
Route::get('/track/open/{campaign}', [TrackingController::class, 'open']);
Route::get('/track/click/{campaign}', [TrackingController::class, 'click']);

/*
 | Serve files from storage/app/public through Laravel — NO symlink required.
 |
 | Every logo/vehicle-image/avatar URL is generated as `/media/<path>` (see the
 | model accessors). Because `public/media` does NOT physically exist, the dev
 | server (`php artisan serve`) and any web server can never short-circuit and
 | try to serve it as a static file — the request is ALWAYS routed here, and we
 | stream the file straight out of storage/app/public.
 |
 | This sidesteps `php artisan storage:link` entirely, which frequently fails on
 | Windows ("Cannot create a file when that file already exists") or leaves a
 | broken junction, causing uploaded images to 404 even though the file saved
 | fine. `/storage/{path}` is kept as an extra fallback for any legacy URLs.
 */
$serveFromPublicDisk = function (string $path) {
    if (str_contains($path, '..') || ! Storage::disk('public')->exists($path)) {
        abort(404);
    }

    return new BinaryFileResponse(
        Storage::disk('public')->path($path),
        200,
        ['Cache-Control' => 'public, max-age=31536000'],
    );
};

Route::get('/media/{path}', $serveFromPublicDisk)->where('path', '.*');
Route::get('/storage/{path}', $serveFromPublicDisk)->where('path', '.*');
