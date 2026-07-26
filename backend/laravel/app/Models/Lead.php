<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lead extends Model
{
    use HasFactory;
    use SoftDeletes;

    /*
    |--------------------------------------------------------------------------
    | Mass Assignable
    |--------------------------------------------------------------------------
    */
    protected $fillable = [
        'uuid',
        'dealer_id',
        'vehicle_id',
        'name',
        'email',
        'phone',
        'message',
        'status',
        'source',
    ];

    /*
    |--------------------------------------------------------------------------
    | Hidden
    |--------------------------------------------------------------------------
    */
    protected $hidden = [
        'deleted_at',
    ];

    /*
    |--------------------------------------------------------------------------
    | Casts
    |--------------------------------------------------------------------------
    */
    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'deleted_at' => 'datetime',
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */
    public function dealer(): BelongsTo
    {
        return $this->belongsTo(Dealer::class);
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }

    /*
    |--------------------------------------------------------------------------
    | Accessors
    |--------------------------------------------------------------------------
    */

    // "AB" from "Abu Ahmed" — avatar initials
    public function getInitialsAttribute(): string
    {
        $parts = preg_split('/\s+/', trim($this->name)) ?: [];
        $first = mb_substr($parts[0] ?? '', 0, 1);
        $last  = count($parts) > 1 ? mb_substr(end($parts), 0, 1) : '';

        return mb_strtoupper($first . $last) ?: 'L';
    }

    /*
    |--------------------------------------------------------------------------
    | Query Scopes  (status: new, contacted, qualified, closed, lost)
    |--------------------------------------------------------------------------
    */
    public function scopeByDealer($query, $dealerId)
    {
        return $query->where('dealer_id', $dealerId);
    }

    public function scopeStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeLatestFirst($query)
    {
        return $query->orderBy('created_at', 'desc');
    }

    // search name / email / phone
    public function scopeSearch($query, $term)
    {
        return $query->where(function ($q) use ($term) {
            $q->where('name', 'like', "%{$term}%")
              ->orWhere('email', 'like', "%{$term}%")
              ->orWhere('phone', 'like', "%{$term}%");
        });
    }
}