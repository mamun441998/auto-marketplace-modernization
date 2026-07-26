<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VehicleImageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            // Identity
            'id'         => $this->id,
            'vehicle_id' => $this->vehicle_id,

            // Image
            'image_path' => $this->image_path,
            'image_url'  => $this->image_url,   // accessor: getImageUrlAttribute()
            'alt_text'   => $this->alt_text,

            // Display
            'is_featured' => (bool) $this->is_featured,
            'sort_order'  => (int) $this->sort_order,

            // Metadata
            'image_source' => $this->image_source,

            // Dates
            'created_at' => optional($this->created_at)->toISOString(),
            'updated_at' => optional($this->updated_at)->toISOString(),
        ];
    }
}