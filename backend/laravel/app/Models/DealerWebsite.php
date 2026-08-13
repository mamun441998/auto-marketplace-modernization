<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DealerWebsite extends Model
{
    use HasFactory;

    protected $fillable = [
        'dealer_id',
        'is_published',
        'custom_domain',
        'config',
        'meta_pixel_id',
        'google_analytics_id',
    ];

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
            'config'       => 'array',   // JSON <-> PHP array
            'created_at'   => 'datetime',
            'updated_at'   => 'datetime',
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

    /*
    |--------------------------------------------------------------------------
    | Default config (used when a dealer has no website yet)
    |--------------------------------------------------------------------------
    */
    public static function defaultConfig(): array
    {
        return [
            'theme' => [
                'preset'    => 'orange',
                'primary'   => '#FC5E01',
                'secondary' => '#111B33',
                'font'      => 'Inter',
            ],
            'branding' => [
                'siteName' => null,   // dealer name fallback হবে
                'logo'     => null,
                'favicon'  => null,
            ],
            'home' => [
                'heroTitle'     => 'Find Your Dream Vehicle Today',
                'heroSubtitle'  => 'Explore our premium collection of certified vehicles at competitive rates.',
                'heroImage'     => null,
                'featuredCount' => 6,
                'showFinancing' => true,
            ],
            'inventory' => [
                'enabled'  => true,
                'title'    => 'Our Inventory',
                'subtitle' => 'Browse our full selection of quality vehicles.',
            ],
            'about' => [
                'enabled'  => true,
                'title'    => 'About Our Dealership',
                'subtitle' => 'Trusted vehicles and exceptional service.',
                'story'    => 'We help customers find the right vehicle through honesty and transparency.',
            ],
            'financing' => [
                'enabled'  => true,
                'title'    => 'Flexible Financing Solutions',
                'subtitle' => 'Fast approvals with competitive options.',
            ],
            'contact' => [
                'enabled' => true,
                'title'   => 'Contact Us',
                'subtitle'=> 'Our team is ready to help you.',
                'phone'   => null,
                'email'   => null,
                'address' => null,
                'hours'   => 'Mon–Sat: 9am – 7pm',
            ],
            'social' => [
                'facebook'  => null,
                'instagram' => null,
                'youtube'   => null,
                'whatsapp'  => null,
            ],
            'seo' => [
                'metaTitle'       => null,
                'metaDescription' => null,
                'ogImage'         => null,
            ],
            'tracking' => [
                'metaPixelId'       => null,
                'googleAnalyticsId' => null,
            ],
            'features' => [
                'chatWidget' => true,
            ],
        ];
    }
}