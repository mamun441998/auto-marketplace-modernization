<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class LeadInquiryMail extends Mailable
{
    use Queueable, SerializesModels;

    public string $customerName;
    public string $dealerName;
    public ?string $vehicleTitle;
    public ?string $customerMessage;

    public function __construct(
        string $customerName,
        string $dealerName,
        ?string $vehicleTitle,
        ?string $customerMessage
    ) {
        $this->customerName    = $customerName;
        $this->dealerName      = $dealerName;
        $this->vehicleTitle    = $vehicleTitle;
        $this->customerMessage = $customerMessage;
    }

    public function build()
    {
        return $this
            ->subject('We received your inquiry — ' . $this->dealerName)
            ->view('emails.lead-inquiry');
    }
}