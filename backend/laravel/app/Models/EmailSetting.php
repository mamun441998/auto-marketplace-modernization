<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmailSetting extends Model
{
    protected $fillable = [
        'dealer_id',
        'provider',
        'host',
        'port',
        'username',
        'password',
        'encryption',
        'from_email',
        'from_name',
        'is_active',
    ];

    protected $casts = [
        'password'  => 'encrypted', // DB-তে encrypted হয়ে থাকবে, read করলে auto-decrypt
        'is_active' => 'boolean',
        'port'      => 'integer',
    ];

    public function dealer()
    {
        return $this->belongsTo(Dealer::class);
    }
}