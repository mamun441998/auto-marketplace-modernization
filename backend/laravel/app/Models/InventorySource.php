<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class InventorySource extends Model
{
    use HasFactory;
    use SoftDeletes;

    /**
     * --------------------------------------------------------------------------
     * Mass Assignable
     * --------------------------------------------------------------------------
     */
    protected $fillable = [
        'uuid',

        'name',
        'slug',

        'type',

        'base_url',

        'api_key',
        'api_secret',

        'last_synced_at',
        'sync_interval',

        'is_active',
    ];

    /**
     * --------------------------------------------------------------------------
     * Hidden
     * --------------------------------------------------------------------------
     */
    protected $hidden = [
        'api_secret',
        'deleted_at',
    ];

    /**
     * --------------------------------------------------------------------------
     * Attribute Casting
     * --------------------------------------------------------------------------
     */
    protected function casts(): array
    {
        return [
            'is_active'      => 'boolean',

            'last_synced_at' => 'datetime',

            'created_at'     => 'datetime',
            'updated_at'     => 'datetime',
            'deleted_at'     => 'datetime',
        ];
    }

    /**
     * --------------------------------------------------------------------------
     * Relationships
     * --------------------------------------------------------------------------
     */

    public function vehicles(): HasMany
    {
        return $this->hasMany(Vehicle::class);
    }

    /**
     * --------------------------------------------------------------------------
     * Query Scopes
     * --------------------------------------------------------------------------
     */

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeInactive($query)
    {
        return $query->where('is_active', false);
    }

    public function scopeLatestFirst($query)
    {
        return $query->latest();
    }

    /**
     * --------------------------------------------------------------------------
     * Helpers
     * --------------------------------------------------------------------------
     */

    public function isActive(): bool
    {
        return $this->is_active;
    }
}