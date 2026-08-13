<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    protected $fillable = [
        'dealer_id',
        'vehicle_id',
        'customer_name',
        'customer_email',
        'amount',
        'currency',
        'provider',
        'provider_reference',
        'status',
        'paid_at',
    ];

    protected $casts = [
        'dealer_id'  => 'integer',
        'vehicle_id' => 'integer',
        'amount'     => 'decimal:2',
        'paid_at'    => 'datetime',
    ];

    public function dealer(): BelongsTo
    {
        return $this->belongsTo(Dealer::class);
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }
}