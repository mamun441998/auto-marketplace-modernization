<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Conversation extends Model
{
    protected $fillable = [
        'dealer_id',
        'token',
        'visitor_name',
        'visitor_email',
        'visitor_phone',
        'status',
        'unread_dealer',
        'last_message_at',
    ];

    protected $casts = [
        'unread_dealer'   => 'integer',
        'last_message_at' => 'datetime',
    ];

    public function dealer(): BelongsTo
    {
        return $this->belongsTo(Dealer::class);
    }

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class)->orderBy('created_at');
    }

    public function latestMessage(): HasMany
    {
        return $this->hasMany(Message::class)->latestOfMany();
    }
}