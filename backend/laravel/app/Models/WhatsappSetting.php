<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WhatsappSetting extends Model
{
    protected $fillable = [
        'dealer_id',
        'provider',
        'api_token',
        'phone_number_id',
        'from_number',
        'is_active',
    ];

    protected $casts = [
        'api_token' => 'encrypted', // stored encrypted in DB
        'is_active' => 'boolean',
    ];

    public function dealer()
    {
        return $this->belongsTo(Dealer::class);
    }
}