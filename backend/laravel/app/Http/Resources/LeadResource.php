<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LeadResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            // Identity
            'id'   => $this->id,
            'uuid' => $this->uuid,

            // Contact info
            'name'     => $this->name,
            'email'    => $this->email,
            'phone'    => $this->phone,
            'message'  => $this->message,
            'initials' => $this->initials, // accessor: "AB"

            // Pipeline
            'status' => $this->status,
            'source' => $this->source,

            // Relationships
            'dealer_id'  => $this->dealer_id,
            'vehicle_id' => $this->vehicle_id,

            // Interested vehicle (only if loaded)
            'vehicle' => $this->whenLoaded('vehicle', function () {
                return $this->vehicle ? [
                    'id'    => $this->vehicle->id,
                    'slug'  => $this->vehicle->slug,
                    'title' => $this->vehicle->title,
                    'make'  => $this->vehicle->make,
                    'model' => $this->vehicle->model,
                    'year'  => $this->vehicle->year,
                ] : null;
            }),

            // Timestamps
            'created_at' => optional($this->created_at)->toISOString(),
            'updated_at' => optional($this->updated_at)->toISOString(),
        ];
    }
}