<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DealerPaymentSetting extends Model
{
    protected $fillable = [
        'dealer_id',
        'stripe_secret_key',
        'stripe_enabled',
        'paypal_client_id',
        'paypal_enabled',
        'diposit_amount',
    ];

    protected $casts = [
        'dealer_id'      => 'integer',
        'stripe_enabled' => 'boolean',
        'paypal_enabled' => 'boolean',
        'siposit_amout' => 'decimal:2'
    ];

    public function dealer(): BelongsTo
    {
        return $this->belongsTo(Dealer::class);
    }
}