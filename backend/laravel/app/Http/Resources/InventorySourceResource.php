<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InventorySourceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            // Identity
            'id'   => $this->id,
            'uuid' => $this->uuid,

            // Source Information
            'name' => $this->name,
            'slug' => $this->slug,
            'type' => $this->type,

            // API Information
            'base_url' => $this->base_url,

            // Synchronization
            'last_synced_at' => optional($this->last_synced_at)->toISOString(),
            'sync_interval'  => $this->sync_interval,

            // Status
            'is_active' => (bool) $this->is_active,

            // Statistics
            'vehicle_count' => $this->whenCounted('vehicles'),

            // Dates
            'created_at' => optional($this->created_at)->toISOString(),
            'updated_at' => optional($this->updated_at)->toISOString(),
        ];
    }
}