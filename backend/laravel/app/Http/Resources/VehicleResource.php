<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VehicleResource extends JsonResource
{
    /**
     * --------------------------------------------------------------------------
     * Transform Resource
     * --------------------------------------------------------------------------
     */
    public function toArray(Request $request): array
    {
        return [

            /*
            |--------------------------------------------------------------------------
            | Identity
            |--------------------------------------------------------------------------
            */

            'id' => $this->id,

            'uuid' => $this->uuid,

            'slug' => $this->slug,

            /*
            |--------------------------------------------------------------------------
            | Basic Information
            |--------------------------------------------------------------------------
            */

            'title' => $this->title,

            'description' => $this->description,

            'vin' => $this->vin,

            /*
            |--------------------------------------------------------------------------
            | Vehicle Information
            |--------------------------------------------------------------------------
            */

            'make' => $this->make,

            'model' => $this->model,

            'year' => $this->year,

            'condition' => $this->condition,

            'body_type' => $this->body_type,

            'fuel_type' => $this->fuel_type,

            'transmission' => $this->transmission,

            'color' => $this->color,

            'mileage' => $this->mileage,

            /*
            |--------------------------------------------------------------------------
            | Pricing
            |--------------------------------------------------------------------------
            */

            'price' => $this->price,

            'currency' => $this->currency,

            'formatted_price' => number_format(
                (float) $this->price,
                2
            ) . ' ' . $this->currency,

            /*
            |--------------------------------------------------------------------------
            | Status
            |--------------------------------------------------------------------------
            */

            'status' => $this->status,

            'published_at' => optional(
                $this->published_at
            )->toISOString(),

            /*
            |--------------------------------------------------------------------------
            | Dealer
            |--------------------------------------------------------------------------
            */

            'dealer' => new DealerResource(
                $this->whenLoaded('dealer')
            ),

            /*
            |--------------------------------------------------------------------------
            | Inventory Source
            |--------------------------------------------------------------------------
            */

            'inventory_source' => new InventorySourceResource(
                $this->whenLoaded('inventorySource')
            ),

            /*
            |--------------------------------------------------------------------------
            | Images
            |--------------------------------------------------------------------------
            */

            'images' => VehicleImageResource::collection(
                $this->whenLoaded('images')
            ),

            /*
            |--------------------------------------------------------------------------
            | Featured Image
            |--------------------------------------------------------------------------
            */

            'featured_image' => $this->whenLoaded(
                'images',
                function () {

                    $featured = $this->images
                        ->where('is_featured', true)
                        ->sortBy('sort_order')
                        ->first();

                    if (!$featured) {

                        $featured = $this->images
                            ->sortBy('sort_order')
                            ->first();
                    }

                    return $featured
                        ? new VehicleImageResource($featured)
                        : null;
                }
            ),

            /*
            |--------------------------------------------------------------------------
            | Quick Access Helpers
            |--------------------------------------------------------------------------
            */

            'primary_image_url' => $this->primary_image,

            'image_count' => $this->whenLoaded(
                'images',
                fn () => $this->images->count()
            ),

            /*
            |--------------------------------------------------------------------------
            | Metadata
            |--------------------------------------------------------------------------
            */

            'created_at' => optional(
                $this->created_at
            )->toISOString(),

            'updated_at' => optional(
                $this->updated_at
            )->toISOString(),
        ];
    }
}