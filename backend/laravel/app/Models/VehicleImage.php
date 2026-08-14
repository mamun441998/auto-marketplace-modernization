<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VehicleImage extends Model
{
    use HasFactory;

    /**
     * --------------------------------------------------------------------------
     * Mass Assignable
     * --------------------------------------------------------------------------
     */
    protected $fillable = [

        /*
        |--------------------------------------------------------------------------
        | Relationships
        |--------------------------------------------------------------------------
        */
        'vehicle_id',

        /*
        |--------------------------------------------------------------------------
        | Image Information
        |--------------------------------------------------------------------------
        */
        'image_path',
        'alt_text',

        /*
        |--------------------------------------------------------------------------
        | Display
        |--------------------------------------------------------------------------
        */
        'is_featured',
        'sort_order',

        /*
        |--------------------------------------------------------------------------
        | Source
        |--------------------------------------------------------------------------
        */
        'image_source',
    ];

    /**
     * --------------------------------------------------------------------------
     * Hidden
     * --------------------------------------------------------------------------
     */
    protected $hidden = [];

    /**
     * --------------------------------------------------------------------------
     * Attribute Casting
     * --------------------------------------------------------------------------
     */
    protected function casts(): array
    {
        return [

            'is_featured' => 'boolean',

            'sort_order' => 'integer',

            'created_at' => 'datetime',

            'updated_at' => 'datetime',

        ];
    }

    /**
     * --------------------------------------------------------------------------
     * Relationships
     * --------------------------------------------------------------------------
     */

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }

    /**
     * --------------------------------------------------------------------------
     * Accessors
     * --------------------------------------------------------------------------
     */

    public function getImageUrlAttribute(): ?string
    {
        if (!$this->image_path) {
            return null;
        }

        return url('media/' . $this->image_path);
    }

    /**
     * --------------------------------------------------------------------------
     * Query Scopes
     * --------------------------------------------------------------------------
     */

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeOrdered($query)
    {
        return $query
            ->orderBy('sort_order')
            ->orderBy('id');
    }

    /**
     * --------------------------------------------------------------------------
     * Helper Methods
     * --------------------------------------------------------------------------
     */

    public function isFeatured(): bool
    {
        return (bool) $this->is_featured;
    }
}