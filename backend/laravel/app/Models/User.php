<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerifyEmailMail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;

    /*
    |--------------------------------------------------------------------------
    | Mass Assignable
    |--------------------------------------------------------------------------
    */

    protected $fillable = [
        'name',
        'email',
        'password',

        // Future Ready
        'role',
        'status',
        'avatar',
        'phone',
        'trial_ends_at',
    ];

    /*
    |--------------------------------------------------------------------------
    | Hidden
    |--------------------------------------------------------------------------
    */

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /*
    |--------------------------------------------------------------------------
    | Casts
    |--------------------------------------------------------------------------
    */

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'trial_ends_at'     => 'datetime',
            'password'          => 'hashed',
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | Accessors
    |--------------------------------------------------------------------------
    */

    public function getInitialsAttribute(): string
    {
        return collect(explode(' ', trim($this->name)))
            ->filter()
            ->map(fn ($word) => strtoupper(substr($word, 0, 1)))
            ->implode('');
    }

    public function getAvatarUrlAttribute(): ?string
    {
        if (!$this->avatar) {
            return null;
        }

        return asset('storage/' . $this->avatar);
    }

    /*
    |--------------------------------------------------------------------------
    | Helpers
    |--------------------------------------------------------------------------
    */

    public function isDealer(): bool
    {
        return $this->role === 'dealer';
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isSuperAdmin(): bool
    {
        return $this->role === 'super_admin';
    }

    public function isActive(): bool
    {
        return $this->status === 'active';
    }

    public function isTrialExpired(): bool
    {
        if (!$this->trial_ends_at) {
            return false;
        }

        return now()->greaterThan($this->trial_ends_at);
    }

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    |
    | These will be used in future phases.
    |
    */

    public function dealer()
    {
        return $this->hasOne(Dealer::class);
    }

    /*
    |--------------------------------------------------------------------------
    | Email Verification
    |--------------------------------------------------------------------------
    */

    public function sendEmailVerificationNotification(): void
    {
        $code = random_int(100000, 999999);

        cache()->put(
            'verify_email_' . $this->id,
            $code,
            now()->addMinutes(10)
        );

        Mail::to($this->email)->queue(
            new VerifyEmailMail(
                $this,
                (string) $code
            )
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Future Relationships
    |--------------------------------------------------------------------------
    |
    | subscription()
    | website()
    | inventory()
    | vehicles()
    | leads()
    | analytics()
    |
    */
}