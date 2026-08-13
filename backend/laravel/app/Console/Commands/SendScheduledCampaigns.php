<?php

namespace App\Console\Commands;

use App\Models\Campaign;
use App\Services\CampaignDispatcher;
use Illuminate\Console\Command;

class SendScheduledCampaigns extends Command
{
    protected $signature = 'campaigns:send-scheduled';

    protected $description = 'Send any campaigns whose scheduled time has arrived.';

    public function handle(): int
    {
        $due = Campaign::where('status', 'scheduled')
            ->whereNotNull('scheduled_at')
            ->where('scheduled_at', '<=', now())
            ->get();

        if ($due->isEmpty()) {
            $this->info('No scheduled campaigns are due.');
            return self::SUCCESS;
        }

        foreach ($due as $campaign) {
            // Mark as sending first so a second run can't pick it up.
            $campaign->update(['status' => 'sending']);

            $sent = CampaignDispatcher::dispatch($campaign);

            $this->info("Campaign #{$campaign->id} ({$campaign->channel}) sent to {$sent} recipient(s).");
        }

        return self::SUCCESS;
    }
}