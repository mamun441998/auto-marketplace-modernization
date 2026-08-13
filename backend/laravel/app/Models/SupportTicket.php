<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SupportTicket extends Model
{
    protected $fillable = [
        'dealer_id',
        'user_id',
        'subject',
        'status',
        'priority',
        'last_reply_at',
    ];

    protected $casts = [
        'dealer_id'     => 'integer',
        'user_id'       => 'integer',
        'last_reply_at' => 'datetime',
    ];

    public function messages(): HasMany
    {
        return $this->hasMany(SupportTicketMessage::class, 'ticket_id')->orderBy('id');
    }

    public function dealer(): BelongsTo
    {
        return $this->belongsTo(Dealer::class);
    }
}