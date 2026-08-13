<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use App\Models\Contact;
use App\Models\Lead;
use App\Models\WhatsappSetting;
use App\Services\CampaignDispatcher;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class CampaignController extends Controller
{
    /** GET /api/dealer/campaigns — list + audience count. */
    public function index(Request $request): JsonResponse
    {
        $dealer = $request->user()->currentDealer();
        if (! $dealer) {
            return response()->json(['success' => false, 'message' => 'No dealership found.'], 404);
        }

        $channel = $request->query('channel'); // email | whatsapp | null (all)

        $q = Campaign::where('dealer_id', $dealer->id);
        if ($channel) {
            $q->where('channel', $channel);
        }
        $campaigns = $q->latest()->get()->map(fn ($c) => $this->present($c));

        return response()->json([
            'success'   => true,
            'campaigns' => $campaigns,
            'audience'  => [
                'total'          => Lead::where('dealer_id', $dealer->id)->whereNotNull('email')->count(),
                'phone'          => Lead::where('dealer_id', $dealer->id)->whereNotNull('phone')->count(),
                'imported'       => Contact::where('dealer_id', $dealer->id)->whereNotNull('email')->where('email', '!=', '')->count(),
                'imported_phone' => Contact::where('dealer_id', $dealer->id)->whereNotNull('phone')->where('phone', '!=', '')->count(),
            ],
        ]);
    }

    /** POST /api/dealer/campaigns — create + send emails (or schedule for later). */
    public function store(Request $request): JsonResponse
    {
        $dealer = $request->user()->currentDealer();
        if (! $dealer) {
            return response()->json(['success' => false, 'message' => 'No dealership found.'], 404);
        }

        if (! $request->user()->hasActiveAccess()) {
            return response()->json([
                'success' => false,
                'code'    => 'subscription_required',
                'message' => 'An active subscription or trial is required to send campaigns.',
            ], 403);
        }

        $data = $request->validate([
            'name'         => ['required', 'string', 'max:150'],
            'subject'      => ['required', 'string', 'max:200'],
            'body'         => ['required', 'string'],
            'audience'     => ['nullable', 'string', 'max:50'],
            'scheduled_at' => ['nullable', 'date'],
        ]);

        $audience = $data['audience'] ?? 'all';
        $scheduledAt = $this->futureSchedule($data['scheduled_at'] ?? null);

        $campaign = Campaign::create([
            'dealer_id'        => $dealer->id,
            'name'             => $data['name'],
            'subject'          => $data['subject'],
            'body'             => $data['body'],
            'audience'         => $audience,
            'channel'          => 'email',
            'status'           => $scheduledAt ? 'scheduled' : 'draft',
            'scheduled_at'     => $scheduledAt,
            'recipients_count' => 0,
        ]);

        // Scheduled for later — don't send now.
        if ($scheduledAt) {
            return response()->json([
                'success'  => true,
                'message'  => 'Campaign scheduled for ' . $scheduledAt->toDayDateTimeString() . '.',
                'campaign' => $this->present($campaign->fresh()),
            ], 201);
        }

        // Send now.
        $sent = CampaignDispatcher::dispatch($campaign);

        return response()->json([
            'success'  => true,
            'message'  => "Campaign sent to {$sent} recipient(s).",
            'campaign' => $this->present($campaign->fresh()),
        ], 201);
    }

    /** POST /api/dealer/campaigns/whatsapp — create + send a WhatsApp broadcast (or schedule). */
    public function whatsapp(Request $request): JsonResponse
    {
        $dealer = $request->user()->currentDealer();
        if (! $dealer) {
            return response()->json(['success' => false, 'message' => 'No dealership found.'], 404);
        }

        if (! $request->user()->hasActiveAccess()) {
            return response()->json([
                'success' => false,
                'code'    => 'subscription_required',
                'message' => 'An active subscription or trial is required to send broadcasts.',
            ], 403);
        }

        $data = $request->validate([
            'name'         => ['required', 'string', 'max:150'],
            'body'         => ['required', 'string', 'max:4000'],
            'audience'     => ['nullable', 'string', 'max:50'],
            'scheduled_at' => ['nullable', 'date'],
        ]);

        $s = WhatsappSetting::where('dealer_id', $dealer->id)->where('is_active', true)->first();
        if (! $s || ! $s->api_token) {
            return response()->json([
                'success' => false,
                'code'    => 'whatsapp_not_configured',
                'message' => 'Connect your WhatsApp API in the WhatsApp tab first.',
            ], 422);
        }

        $audience = $data['audience'] ?? 'all';
        $scheduledAt = $this->futureSchedule($data['scheduled_at'] ?? null);

        $campaign = Campaign::create([
            'dealer_id'        => $dealer->id,
            'name'             => $data['name'],
            'subject'          => 'WhatsApp Broadcast',
            'body'             => $data['body'],
            'audience'         => $audience,
            'channel'          => 'whatsapp',
            'status'           => $scheduledAt ? 'scheduled' : 'draft',
            'scheduled_at'     => $scheduledAt,
            'recipients_count' => 0,
        ]);

        if ($scheduledAt) {
            return response()->json([
                'success'  => true,
                'message'  => 'Broadcast scheduled for ' . $scheduledAt->toDayDateTimeString() . '.',
                'campaign' => $this->present($campaign->fresh()),
            ], 201);
        }

        $sent = CampaignDispatcher::dispatch($campaign);

        return response()->json([
            'success'  => true,
            'message'  => "WhatsApp broadcast sent to {$sent} recipient(s).",
            'campaign' => $this->present($campaign->fresh()),
        ], 201);
    }

    /** Returns a Carbon instance only if the given time is in the future; otherwise null (= send now). */
    private function futureSchedule(?string $value): ?Carbon
    {
        if (! $value) {
            return null;
        }
        $when = Carbon::parse($value);
        return $when->isFuture() ? $when : null;
    }

    private function present(Campaign $c): array
    {
        return [
            'id'               => $c->id,
            'name'             => $c->name,
            'subject'          => $c->subject,
            'body'             => $c->body,
            'audience'         => $c->audience,
            'channel'          => $c->channel,
            'status'           => $c->status,
            'recipients_count' => $c->recipients_count,
            'opens_count'      => $c->opens_count,
            'clicks_count'     => $c->clicks_count,
            'scheduled_at'     => optional($c->scheduled_at)->toDateTimeString(),
            'sent_at'          => optional($c->sent_at)->toDateTimeString(),
            'created_at'       => optional($c->created_at)->toDateTimeString(),
        ];
    }
}