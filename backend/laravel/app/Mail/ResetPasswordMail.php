<?php

namespace App\Mail;

use App\Models\User;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ResetPasswordMail extends Mailable
{
    use Queueable;
    use SerializesModels;

    public User $user;
    public string $code;

    public function __construct(User $user, string $code)
    {
        $this->user = $user;
        $this->code = $code;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Reset Your MotoHave Password',
            replyTo: [config('mail.from.address')],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.reset-password',
            with: [
                'user'         => $this->user,
                'code'         => $this->code,
                'appName'      => config('app.name'),
                'supportEmail' => config('mail.from.address'),
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}