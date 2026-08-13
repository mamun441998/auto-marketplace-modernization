<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PromoCode extends Model
{
    protected $fillable = [
        'dealer_id',
        'code',
        'type',
        'value',
        'max_uses',
        'used_count',
        'expires_at',
        'is_active',
        'description',
    ];

    protected $casts = [
        'value'      => 'decimal:2',
        'max_uses'   => 'integer',
        'used_count' => 'integer',
        'expires_at' => 'date',
        'is_active'  => 'boolean',
    ];

    public function dealer(): BelongsTo
    {
        return $this->belongsTo(Dealer::class);
    }

    /** Whether this code can still be used right now. */
    public function isRedeemable(): bool
    {
        if (! $this->is_active) {
            return false;
        }
        if ($this->expires_at && $this->expires_at->isPast()) {
            return false;
        }
        if ($this->max_uses !== null && $this->used_count >= $this->max_uses) {
            return false;
        }
        return true;
    }
}