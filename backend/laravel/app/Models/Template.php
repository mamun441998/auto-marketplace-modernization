<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    protected $fillable = [
        'dealer_id',
        'name',
        'channel',
        'subject',
        'body',
    ];

    public function dealer()
    {
        return $this->belongsTo(Dealer::class);
    }
}