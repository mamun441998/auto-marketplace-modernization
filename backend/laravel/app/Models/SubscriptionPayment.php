<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SubscriptionPayment extends Model
{
    protected $fillable = [
        'dealer_id',
        'user_id',
        'plan_key',
        'amount',
        'currency',
        'provider',
        'provider_reference',
        'status',
        'period_end',
        'paid_at',
    ];

    protected $casts = [
        'dealer_id'  => 'integer',
        'user_id'    => 'integer',
        'amount'     => 'decimal:2',
        'period_end' => 'datetime',
        'paid_at'    => 'datetime',
    ];

    public function dealer(): BelongsTo
    {
        return $this->belongsTo(Dealer::class);
    }
}