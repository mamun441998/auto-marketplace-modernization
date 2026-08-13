<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminSettingsController extends Controller
{
    /** GET /api/admin/settings — all settings as a key → value map. */
    public function index(): JsonResponse
    {
        $map = [];
        foreach (Setting::all() as $s) {
            $map[$s->key] = json_decode((string) $s->value, true);
        }

        return response()->json(['success' => true, 'settings' => (object) $map]);
    }

    /** PATCH /api/admin/settings — upsert a group of settings. */
    public function update(Request $request): JsonResponse
    {
        $data = $request->validate([
            'settings' => ['required', 'array'],
        ]);

        foreach ($data['settings'] as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => json_encode($value)]);
        }

        return response()->json(['success' => true, 'message' => 'Settings saved.']);
    }
}