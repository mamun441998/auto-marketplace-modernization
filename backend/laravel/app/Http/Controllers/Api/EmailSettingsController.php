<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EmailSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class EmailSettingsController extends Controller
{
    /** GET /api/dealer/email-settings */
    public function show(Request $request): JsonResponse
    {
        $dealer = $request->user()->currentDealer();
        if (! $dealer) {
            return response()->json(['success' => false, 'message' => 'No dealership found.'], 404);
        }

        $s = EmailSetting::where('dealer_id', $dealer->id)->first();

        return response()->json([
            'success'  => true,
            'settings' => $s ? [
                'provider'     => $s->provider,
                'host'         => $s->host,
                'port'         => $s->port,
                'username'     => $s->username,
                'has_password' => (bool) $s->password,   // never send the actual key back
                'encryption'   => $s->encryption,
                'from_email'   => $s->from_email,
                'from_name'    => $s->from_name,
                'is_active'    => $s->is_active,
            ] : null,
        ]);
    }

    /** PUT /api/dealer/email-settings */
    public function update(Request $request): JsonResponse
    {
        $dealer = $request->user()->currentDealer();
        if (! $dealer) {
            return response()->json(['success' => false, 'message' => 'No dealership found.'], 404);
        }

        $data = $request->validate([
            'provider'   => ['required', 'string', 'max:30'],
            'host'       => ['required', 'string', 'max:191'],
            'port'       => ['required', 'integer', 'min:1', 'max:65535'],
            'username'   => ['nullable', 'string', 'max:191'],
            'password'   => ['nullable', 'string', 'max:500'],
            'encryption' => ['nullable', 'string', 'in:tls,ssl,none'],
            'from_email' => ['required', 'email', 'max:191'],
            'from_name'  => ['nullable', 'string', 'max:191'],
            'is_active'  => ['boolean'],
        ]);

        $s = EmailSetting::firstOrNew(['dealer_id' => $dealer->id]);

        $s->provider   = $data['provider'];
        $s->host       = $data['host'];
        $s->port       = $data['port'];
        $s->username   = $data['username'] ?? null;
        if (! empty($data['password'])) {
            $s->password = $data['password']; // keep existing if blank
        }
        $s->encryption = $data['encryption'] ?? 'tls';
        $s->from_email = $data['from_email'];
        $s->from_name  = $data['from_name'] ?? $dealer->name;
        $s->is_active  = $data['is_active'] ?? true;
        $s->save();

        return response()->json(['success' => true, 'message' => 'Email settings saved.']);
    }

    /** POST /api/dealer/email-settings/test */
    public function test(Request $request): JsonResponse
    {
        $dealer = $request->user()->currentDealer();
        if (! $dealer) {
            return response()->json(['success' => false, 'message' => 'No dealership found.'], 404);
        }

        $data = $request->validate(['to' => ['required', 'email']]);

        $s = EmailSetting::where('dealer_id', $dealer->id)->first();
        if (! $s || ! $s->host) {
            return response()->json(['success' => false, 'message' => 'Save your email settings first.'], 422);
        }

        try {
            $mailer = self::runtimeMailer($s);
            Mail::mailer($mailer)->raw(
                "This is a test email from {$dealer->name} via MotoHave. Your email settings are working! ✅",
                function ($m) use ($data, $s, $dealer) {
                    $m->to($data['to'])
                      ->subject('MotoHave — Test Email')
                      ->from($s->from_email, $s->from_name ?: $dealer->name);
                }
            );

            return response()->json(['success' => true, 'message' => "Test email sent to {$data['to']}."]);
        } catch (Throwable $e) {
            Log::error('Email test failed', ['dealer' => $dealer->id, 'error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Test failed: ' . $e->getMessage(),
            ], 422);
        }
    }

    /** Build a runtime SMTP mailer from settings; returns the mailer name. Reused by campaigns. */
    public static function runtimeMailer(EmailSetting $s): string
    {
        $enc = $s->encryption === 'none' ? null : $s->encryption;
        config([
            'mail.mailers.dealer_dynamic' => [
                'transport'  => 'smtp',
                'host'       => $s->host,
                'port'       => $s->port,
                'username'   => $s->username,
                'password'   => $s->password,
                'encryption' => $enc,
                'timeout'    => null,
            ],
        ]);
        return 'dealer_dynamic';
    }
}