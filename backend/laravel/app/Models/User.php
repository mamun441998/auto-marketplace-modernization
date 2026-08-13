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

        'role',
        'status',
        'avatar',
        'phone',

        // Team
        'dealer_id',
        'team_role',
        'member_status',

        // Subscription
        'trial_ends_at',
        'plan',
        'subscription_status',
        'subscription_ends_at',
        'stripe_customer_id',
        'stripe_subscription_id',
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
            'email_verified_at'    => 'datetime',
            'trial_ends_at'        => 'datetime',
            'subscription_ends_at' => 'datetime',
            'password'             => 'hashed',
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
        if (! $this->avatar) {
            return null;
        }

        return asset('storage/' . $this->avatar);
    }

    /*
    |--------------------------------------------------------------------------
    | Role / status helpers (system role)
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

    /*
    |--------------------------------------------------------------------------
    | Team role helpers (owner | manager | staff)
    |--------------------------------------------------------------------------
    */
    public function teamRole(): string
    {
        return $this->team_role ?: 'owner';
    }

    public function isOwner(): bool
    {
        return $this->teamRole() === 'owner';
    }

    public function isManager(): bool
    {
        return $this->teamRole() === 'manager';
    }

    public function isStaff(): bool
    {
        return $this->teamRole() === 'staff';
    }

    /** Owner + Manager team manage করতে পারে। */
    public function canManageTeam(): bool
    {
        return in_array($this->teamRole(), ['owner', 'manager'], true);
    }

    /*
    |--------------------------------------------------------------------------
    | Subscription / Plan helpers
    |--------------------------------------------------------------------------
    */

    /** Currently on a valid free trial? */
    public function onTrial(): bool
    {
        return $this->subscription_status === 'trialing'
            && $this->trial_ends_at
            && $this->trial_ends_at->isFuture();
    }

    /** Trial period is over (and no active paid plan). */
    public function isTrialExpired(): bool
    {
        return $this->trial_ends_at
            && $this->trial_ends_at->isPast()
            && ! $this->subscriptionActive();
    }

    /** Has a paid, active subscription? */
    public function subscriptionActive(): bool
    {
        return $this->subscription_status === 'active'
            && (! $this->subscription_ends_at || $this->subscription_ends_at->isFuture());
    }

    /** Can use the app right now (trial or active plan)? */
    public function hasActiveAccess(): bool
    {
        return $this->onTrial() || $this->subscriptionActive();
    }

    /** Which plan's access applies right now. */
    public function activePlanKey(): string
    {
        if ($this->onTrial()) {
            return config('plans.trial_plan', 'professional');
        }
        if ($this->subscriptionActive() && $this->plan) {
            return $this->plan;
        }
        return $this->plan ?? 'starter';
    }

    /** The plan config array for the active plan. */
    public function planConfig(): array
    {
        $key = $this->activePlanKey();
        return config("plans.plans.$key", config('plans.plans.starter'));
    }

    /** Is a feature available on the active plan (and access valid)? */
    public function planFeature(string $feature): bool
    {
        if (! $this->hasActiveAccess()) {
            return false;
        }
        return (bool) data_get($this->planConfig(), "features.$feature", false);
    }

    /** A numeric limit (null = unlimited). */
    public function planLimit(string $key): ?int
    {
        return data_get($this->planConfig(), $key, 0);
    }

    /** Days left in trial (0 if none/expired). */
    public function trialDaysLeft(): int
    {
        if (! $this->trial_ends_at) {
            return 0;
        }
        return max(0, (int) ceil(now()->diffInDays($this->trial_ends_at, false)));
    }

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    /** যে dealership এই user নিজে owner হিসেবে খুলেছে। */
    public function dealer()
    {
        return $this->hasOne(Dealer::class);
    }

    /** Team member হলে যে dealership-এর সাথে যুক্ত। */
    public function memberOfDealer()
    {
        return $this->belongsTo(Dealer::class, 'dealer_id');
    }

    /**
     * এই user এখন যে dealership-এর হয়ে কাজ করছে।
     * Owner → নিজের dealership; Team member → linked dealership.
     */
    public function currentDealer(): ?Dealer
    {
        $owned = $this->dealer;      // hasOne (owner)
        if ($owned) {
            return $owned;
        }

        return $this->dealer_id ? $this->memberOfDealer : null;
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
            new VerifyEmailMail($this, (string) $code)
        );
    }
}