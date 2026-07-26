<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DealerResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            // Identity
            'id'      => $this->id,
            'uuid'    => $this->uuid,
            'user_id' => $this->user_id,

            // Dealer Information
            'name'        => $this->name,
            'slug'        => $this->slug,
            'email'       => $this->email,
            'phone'       => $this->phone,
            'website'     => $this->website,
            'description' => $this->description,

            // Address
            'address'     => $this->address,
            'city'        => $this->city,
            'state'       => $this->state,
            'postal_code' => $this->postal_code,
            'country'     => $this->country,

            // Location
            'latitude'  => $this->latitude,
            'longitude' => $this->longitude,

            // Business
            'license_number' => $this->license_number,
            'tax_number'     => $this->tax_number,

            // Social Media
            'social' => [
                'facebook'  => $this->facebook,
                'instagram' => $this->instagram,
                'linkedin'  => $this->linkedin,
                'youtube'   => $this->youtube,
            ],

            // Branding (raw path + full URL)
            'logo'            => $this->logo,
            'logo_url'        => $this->logo_url,          // accessor: getLogoUrlAttribute()
            'cover_image'     => $this->cover_image,
            'cover_image_url' => $this->cover_image_url,   // accessor: getCoverImageUrlAttribute()
            'theme'           => $this->theme,

            // SEO
            'meta_title'       => $this->meta_title,
            'meta_description' => $this->meta_description,

            // Status
            'status'      => $this->status,
            'is_active'   => (bool) $this->is_active,
            'is_verified' => (bool) $this->is_verified,
            'is_featured' => (bool) $this->is_featured,

            // Relationships (loaded থাকলেই দেখাবে — N+1 এড়াতে)
            'user'           => new UserResource($this->whenLoaded('user')),
            'vehicles_count' => $this->whenCounted('vehicles'),

            // Timestamps
            'created_at' => optional($this->created_at)->toISOString(),
            'updated_at' => optional($this->updated_at)->toISOString(),
        ];
    }
}