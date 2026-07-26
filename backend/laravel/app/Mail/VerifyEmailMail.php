<?php

namespace App\Mail;

use App\Models\User;

use Illuminate\Bus\Queueable;


use Illuminate\Mail\Mailable;

use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

use Illuminate\Queue\SerializesModels;

class VerifyEmailMail extends Mailable
{
    use Queueable;
    use SerializesModels;

    /**
     * --------------------------------------------------------------------------
     * User
     * --------------------------------------------------------------------------
     */
    public User $user;

    /**
     * --------------------------------------------------------------------------
     * Verification Code
     * --------------------------------------------------------------------------
     */
    public string $code;

    /**
     * --------------------------------------------------------------------------
     * Create Mail
     * --------------------------------------------------------------------------
     */
    public function __construct(
        User $user,
        string $code
    ) {
        $this->user = $user;
        $this->code = $code;
    }

    /**
     * --------------------------------------------------------------------------
     * Envelope
     * --------------------------------------------------------------------------
     */
    public function envelope(): Envelope
    {
        return new Envelope(

            subject: 'Verify Your MotoHave Account',

            replyTo: [
                config('mail.from.address'),
            ],

        );
    }

    /**
     * --------------------------------------------------------------------------
     * Content
     * --------------------------------------------------------------------------
     */
    public function content(): Content
    {
        return new Content(

            view: 'emails.verify-email',

            with: [

                'user' => $this->user,

                'code' => $this->code,

                'appName' => config('app.name'),

                'supportEmail' => config('mail.from.address'),

            ]

        );
    }

    /**
     * --------------------------------------------------------------------------
     * Attachments
     * --------------------------------------------------------------------------
     */
    public function attachments(): array
    {
        return [];
    }
}