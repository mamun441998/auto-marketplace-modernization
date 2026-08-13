<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Dealer extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        // Identity
        'uuid',
        'user_id',

        // Dealer Information
        'name',
        'slug',
        'email',
        'phone',
        'website',
        'description',

        // Address
        'address',
        'city',
        'state',
        'postal_code',
        'country',

        // Location
        'latitude',
        'longitude',

        // Business
        'license_number',
        'tax_number',

        // Social Media
        'facebook',
        'instagram',
        'linkedin',
        'youtube',

        // Branding
        'logo',
        'cover_image',
        'theme',

        // SEO
        'meta_title',
        'meta_description',

        // Settings
        'custom_domain',
        'notification_prefs',

        // Status
        'status',
        'is_active',
        'is_verified',
        'is_featured',
    ];

    protected $hidden = [
        'deleted_at',
    ];

    protected function casts(): array
    {
        return [
            'latitude'  => 'decimal:7',
            'longitude' => 'decimal:7',

            'is_active'   => 'boolean',
            'is_verified' => 'boolean',
            'is_featured' => 'boolean',

            'notification_prefs' => 'array',

            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'deleted_at' => 'datetime',
        ];
    }

    /*
    | Relationships
    */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function vehicles(): HasMany
    {
        return $this->hasMany(Vehicle::class);
    }

    /*
    | Accessors
    */
    public function getLogoUrlAttribute(): ?string
    {
        return $this->logo ? asset('storage/' . $this->logo) : null;
    }

    public function getCoverImageUrlAttribute(): ?string
    {
        return $this->cover_image ? asset('storage/' . $this->cover_image) : null;
    }

    /*
    | Query Scopes
    */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeVerified($query)
    {
        return $query->where('is_verified', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }
}