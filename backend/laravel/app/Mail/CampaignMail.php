<?php

namespace App\Mail;

use App\Models\Campaign;
use App\Models\Dealer;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CampaignMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Campaign $campaign,
        public Dealer $dealer,
        public string $recipientName = ''
    ) {}

    public function build()
    {
        return $this->subject($this->campaign->subject)
            ->view('emails.campaign');
    }
}