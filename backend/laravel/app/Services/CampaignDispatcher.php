<?php

namespace App\Services;

use App\Http\Controllers\Api\EmailSettingsController;
use App\Http\Controllers\Api\WhatsappSettingsController;
use App\Mail\CampaignMail;
use App\Models\Campaign;
use App\Models\Contact;
use App\Models\Dealer;
use App\Models\EmailSetting;
use App\Models\Lead;
use App\Models\WhatsappSetting;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class CampaignDispatcher
{
    /**
     * Send a campaign now (email or whatsapp based on its channel).
     * Marks it 'sent' with the recipient count. Returns number sent.
     */
    public static function dispatch(Campaign $campaign): int
    {
        $dealer = Dealer::find($campaign->dealer_id);
        if (! $dealer) {
            $campaign->update(['status' => 'failed']);
            return 0;
        }

        $sent = $campaign->channel === 'whatsapp'
            ? self::sendWhatsapp($campaign, $dealer)
            : self::sendEmail($campaign, $dealer);

        $campaign->update([
            'status'           => 'sent',
            'recipients_count' => $sent,
            'sent_at'          => now(),
        ]);

        return $sent;
    }

    /** Send the campaign body as an email to all matching recipients. */
    private static function sendEmail(Campaign $campaign, Dealer $dealer): int
    {
        $recipients = self::emailRecipients($dealer->id, $campaign->audience ?? 'all');

        $setting = EmailSetting::where('dealer_id', $dealer->id)->where('is_active', true)->first();
        $mailerName = ($setting && $setting->host) ? EmailSettingsController::runtimeMailer($setting) : null;

        $sent = 0;
        foreach ($recipients as $r) {
            try {
                $mailable = new CampaignMail($campaign, $dealer, (string) ($r['name'] ?? ''));
                if ($setting && $setting->from_email) {
                    $mailable->from($setting->from_email, $setting->from_name ?: $dealer->name);
                }

                if ($mailerName) {
                    Mail::mailer($mailerName)->to($r['email'])->send($mailable);
                } else {
                    Mail::to($r['email'])->send($mailable);
                }
                $sent++;
            } catch (Throwable $e) {
                Log::error('Campaign email failed', [
                    'campaign' => $campaign->id,
                    'email'    => $r['email'],
                    'error'    => $e->getMessage(),
                ]);
            }
        }

        return $sent;
    }

    /** Send the campaign body as a WhatsApp message to all matching recipients. */
    private static function sendWhatsapp(Campaign $campaign, Dealer $dealer): int
    {
        $s = WhatsappSetting::where('dealer_id', $dealer->id)->where('is_active', true)->first();
        if (! $s || ! $s->api_token) {
            Log::warning('Scheduled WhatsApp skipped — not configured', ['campaign' => $campaign->id]);
            return 0;
        }

        $phones = self::phoneRecipients($dealer->id, $campaign->audience ?? 'all');

        $sent = 0;
        foreach ($phones as $phone) {
            $res = WhatsappSettingsController::sendText($s, (string) $phone, $campaign->body);
            if ($res['ok']) {
                $sent++;
            }
        }

        return $sent;
    }

    /**
     * Resolve email recipients for an audience.
     *
     * @return array<int, array{email:string, name:string}>
     */
    public static function emailRecipients(int $dealerId, string $audience): array
    {
        if ($audience === 'imported') {
            return Contact::where('dealer_id', $dealerId)
                ->whereNotNull('email')->where('email', '!=', '')
                ->get()
                ->map(fn ($c) => ['email' => $c->email, 'name' => (string) ($c->name ?? '')])
                ->all();
        }

        $query = Lead::where('dealer_id', $dealerId)->whereNotNull('email');
        if ($audience !== 'all') {
            $query->where('status', $audience);
        }

        return $query->get()
            ->map(fn ($l) => ['email' => $l->email, 'name' => (string) ($l->name ?? '')])
            ->all();
    }

    /**
     * Resolve phone recipients for an audience.
     *
     * @return array<int, string>
     */
    public static function phoneRecipients(int $dealerId, string $audience): array
    {
        if ($audience === 'imported') {
            return Contact::where('dealer_id', $dealerId)
                ->whereNotNull('phone')->where('phone', '!=', '')
                ->pluck('phone')->all();
        }

        $query = Lead::where('dealer_id', $dealerId)->whereNotNull('phone');
        if ($audience !== 'all') {
            $query->where('status', $audience);
        }

        return $query->pluck('phone')->all();
    }
}