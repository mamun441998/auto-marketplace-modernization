<?php

namespace App\Support;

use Illuminate\Support\Facades\Storage;

/**
 * Central place for where uploads live and how their public URLs are built.
 *
 * - Local dev (MEDIA_DISK=public): files sit on the local "public" disk and are
 *   served through the /media/{path} route.
 * - Production (MEDIA_DISK=s3): files go to Supabase Storage (S3-compatible),
 *   which persists across Render redeploys, and the S3 disk's own public URL
 *   is returned.
 */
class Media
{
    /** The filesystem disk uploads are stored on. */
    public static function disk(): string
    {
        return (string) config('filesystems.media_disk', 'public');
    }

    /** Build a public URL for a stored file path (null-safe). */
    public static function url(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        $disk = self::disk();

        // Local "public" disk is served by our own /media route (no symlink needed).
        if ($disk === 'public') {
            return url('media/' . ltrim($path, '/'));
        }

        // S3 / Supabase Storage returns a real, persistent public URL.
        return Storage::disk($disk)->url($path);
    }
}
