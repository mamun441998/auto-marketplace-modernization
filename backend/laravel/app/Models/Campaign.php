<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Campaign extends Model
{
    protected $fillable = [
        'dealer_id',
        'name',
        'subject',
        'body',
        'audience',
        'channel',
        'status',
        'recipients_count',
        'opens_count',
        'clicks_count',
        'scheduled_at',
        'sent_at',
    ];

    protected $casts = [
        'scheduled_at'     => 'datetime',
        'sent_at'          => 'datetime',
        'recipients_count' => 'integer',
        'opens_count'      => 'integer',
        'clicks_count'     => 'integer',
    ];

    public function dealer(): BelongsTo
    {
        return $this->belongsTo(Dealer::class);
    }
}