<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vehicle extends Model
{
    use HasFactory;
    use SoftDeletes;

    /*
    |--------------------------------------------------------------------------
    | Mass Assignable
    |--------------------------------------------------------------------------
    */
    protected $fillable = [
        // Identity
        'uuid',
        'slug',

        // Vehicle Information
        'title',
        'description',
        'vin',
        'make',
        'model',
        'year',

        // Pricing
        'price',
        'currency',

        // Specifications
        'mileage',
        'fuel_type',
        'transmission',
        'condition',
        'body_type',
        'color',

        // Relationships
        'dealer_id',
        'inventory_source_id',

        // Status
        'status',
        'published_at',
    ];

    /*
    |--------------------------------------------------------------------------
    | Hidden Attributes
    |--------------------------------------------------------------------------
    */
    protected $hidden = [
        'deleted_at',
    ];

    /*
    |--------------------------------------------------------------------------
    | Attribute Casting
    |--------------------------------------------------------------------------
    */
    protected function casts(): array
    {
        return [
            'price'        => 'decimal:2',
            'year'         => 'integer',
            'mileage'      => 'integer',
            'details'      => 'array', 
            'published_at' => 'datetime',
            'created_at'   => 'datetime',
            'updated_at'   => 'datetime',
            'deleted_at'   => 'datetime',
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

    public function inventorySource(): BelongsTo
    {
        return $this->belongsTo(InventorySource::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(VehicleImage::class)
            ->orderBy('sort_order');
    }

    /*
    |--------------------------------------------------------------------------
    | Accessors
    |--------------------------------------------------------------------------
    */
    public function getPrimaryImageAttribute(): ?string
    {
        $image = $this->images()->first();

        return $image ? $image->image_url : null;
    }

    public function getFormattedPriceAttribute(): string
    {
        return number_format((float) $this->price, 2) . ' ' . $this->currency;
    }

    public function getFullNameAttribute(): string
    {
        return "{$this->year} {$this->make} {$this->model}";
    }

    /*
    |--------------------------------------------------------------------------
    | Query Scopes  (status enum: draft, active, pending, sold, archived)
    |--------------------------------------------------------------------------
    */

    // গাড়ি live / customer দেখতে পারে
    public function scopePublished($query)
    {
        return $query->where('status', 'active');
    }

    // খসড়া (এখনো live না)
    public function scopeDraft($query)
    {
        return $query->where('status', 'draft');
    }

    // কেনার জন্য পাওয়া যায় (live আছে, বিক্রি হয়নি)
    public function scopeAvailable($query)
    {
        return $query->where('status', 'active');
    }

    // deal চলছে
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    // বিক্রি হয়ে গেছে
    public function scopeSold($query)
    {
        return $query->where('status', 'sold');
    }

    // সরিয়ে রাখা
    public function scopeArchived($query)
    {
        return $query->where('status', 'archived');
    }

    // নির্দিষ্ট dealer-এর গাড়ি
    public function scopeByDealer($query, $dealerId)
    {
        return $query->where('dealer_id', $dealerId);
    }

    // নতুন গাড়ি আগে
    public function scopeLatestFirst($query)
    {
        return $query->orderBy('created_at', 'desc');
    }

    // search (title / make / model / vin)
    public function scopeSearch($query, $term)
    {
        return $query->where(function ($q) use ($term) {
            $q->where('title', 'like', "%{$term}%")
              ->orWhere('make', 'like', "%{$term}%")
              ->orWhere('model', 'like', "%{$term}%")
              ->orWhere('vin', 'like', "%{$term}%");
        });
    }
}