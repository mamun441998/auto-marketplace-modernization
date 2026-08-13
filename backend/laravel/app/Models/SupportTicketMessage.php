<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SupportTicketMessage extends Model
{
    protected $fillable = [
        'ticket_id',
        'author_type',
        'author_id',
        'author_name',
        'body',
    ];

    protected $casts = [
        'ticket_id' => 'integer',
        'author_id' => 'integer',
    ];

    public function ticket(): BelongsTo
    {
        return $this->belongsTo(SupportTicket::class, 'ticket_id');
    }
}