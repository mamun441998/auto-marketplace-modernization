<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WhatsappSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

class WhatsappSettingsController extends Controller
{
    /** GET /api/dealer/whatsapp-settings */
    public function show(Request $request): JsonResponse
    {
        $dealer = $request->user()->currentDealer();
        if (! $dealer) {
            return response()->json(['success' => false, 'message' => 'No dealership found.'], 404);
        }

        $s = WhatsappSetting::where('dealer_id', $dealer->id)->first();

        return response()->json([
            'success'  => true,
            'settings' => $s ? [
                'provider'        => $s->provider,
                'phone_number_id' => $s->phone_number_id,
                'from_number'     => $s->from_number,
                'has_token'       => (bool) $s->api_token,
                'is_active'       => $s->is_active,
            ] : null,
        ]);
    }

    /** PUT /api/dealer/whatsapp-settings */
    public function update(Request $request): JsonResponse
    {
        $dealer = $request->user()->currentDealer();
        if (! $dealer) {
            return response()->json(['success' => false, 'message' => 'No dealership found.'], 404);
        }

        $data = $request->validate([
            'provider'        => ['required', 'string', 'max:30'],
            'api_token'       => ['nullable', 'string', 'max:1000'],
            'phone_number_id' => ['nullable', 'string', 'max:100'],
            'from_number'     => ['nullable', 'string', 'max:30'],
            'is_active'       => ['boolean'],
        ]);

        $s = WhatsappSetting::firstOrNew(['dealer_id' => $dealer->id]);
        $s->provider = $data['provider'];
        if (! empty($data['api_token'])) {
            $s->api_token = $data['api_token']; // keep existing if blank
        }
        $s->phone_number_id = $data['phone_number_id'] ?? null;
        $s->from_number     = $data['from_number'] ?? null;
        $s->is_active       = $data['is_active'] ?? true;
        $s->save();

        return response()->json(['success' => true, 'message' => 'WhatsApp settings saved.']);
    }

    /** POST /api/dealer/whatsapp-settings/test */
    public function test(Request $request): JsonResponse
    {
        $dealer = $request->user()->currentDealer();
        if (! $dealer) {
            return response()->json(['success' => false, 'message' => 'No dealership found.'], 404);
        }

        $data = $request->validate(['to' => ['required', 'string', 'max:30']]);

        $s = WhatsappSetting::where('dealer_id', $dealer->id)->first();
        if (! $s || ! $s->api_token) {
            return response()->json(['success' => false, 'message' => 'Save your WhatsApp API token first.'], 422);
        }

        $result = self::sendText($s, $data['to'], "✅ Test message from {$dealer->name} via MotoHave. Your WhatsApp is connected!");

        return $result['ok']
            ? response()->json(['success' => true, 'message' => "Test message sent to {$data['to']}."])
            : response()->json(['success' => false, 'message' => 'Test failed: ' . $result['error']], 422);
    }

    /** Send a WhatsApp text via Meta Cloud API. Reused by broadcasts. */
    public static function sendText(WhatsappSetting $s, string $to, string $message): array
    {
        $number = preg_replace('/[^0-9]/', '', $to);

        try {
            if ($s->provider === 'meta') {
                $res = Http::withToken($s->api_token)
                    ->acceptJson()
                    ->post("https://graph.facebook.com/v20.0/{$s->phone_number_id}/messages", [
                        'messaging_product' => 'whatsapp',
                        'to'                => $number,
                        'type'              => 'text',
                        'text'              => ['body' => $message],
                    ]);

                return $res->successful()
                    ? ['ok' => true, 'error' => '']
                    : ['ok' => false, 'error' => $res->json('error.message') ?? $res->body()];
            }

            // future: twilio / 360dialog / custom
            return ['ok' => false, 'error' => 'Provider not supported yet.'];
        } catch (Throwable $e) {
            Log::error('WhatsApp send failed', ['dealer' => $s->dealer_id, 'error' => $e->getMessage()]);
            return ['ok' => false, 'error' => $e->getMessage()];
        }
    }
}