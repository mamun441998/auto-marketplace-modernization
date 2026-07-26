<?php

namespace App\Http\Requests\Vehicle;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreVehicleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            // Basic Information
            'title'       => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:10000'],
            'vin'         => ['nullable', 'string', 'max:100', 'unique:vehicles,vin'],

            // Vehicle Information
            'make'  => ['required', 'string', 'max:100'],
            'model' => ['required', 'string', 'max:100'],
            'year'  => ['required', 'integer', 'min:1900', 'max:' . (date('Y') + 1)],

            // Pricing
            'price'    => ['required', 'numeric', 'min:0'],
            'currency' => ['required', 'string', 'size:3'],

            // Specifications
            'mileage' => ['nullable', 'integer', 'min:0'],

            'fuel_type' => [
                'nullable',
                Rule::in(['petrol', 'diesel', 'hybrid', 'electric', 'cng', 'lpg', 'other']),
            ],

            'transmission' => [
                'nullable',
                Rule::in(['automatic', 'manual', 'cvt', 'semi-automatic', 'other']),
            ],

            'condition' => [
                'required',
                Rule::in(['new', 'used', 'certified']),
            ],

            'body_type' => [
                'nullable',
                Rule::in([
                    'sedan', 'suv', 'hatchback', 'wagon', 'pickup', 'truck',
                    'van', 'coupe', 'convertible', 'minivan', 'other',
                ]),
            ],

            'color' => ['nullable', 'string', 'max:50'],

            // Status  (matches vehicles enum: draft, active, pending, sold, archived)
            'status' => [
                'nullable',
                Rule::in(['draft', 'active', 'pending', 'sold', 'archived']),
            ],

            // Images  (accept common image formats incl. webp/avif)
            'images'   => ['nullable', 'array', 'max:20'],
            'images.*' => ['file', 'mimes:jpg,jpeg,png,webp,avif,gif,bmp', 'max:5120'],

            // Featured Image
            'featured_image' => ['nullable', 'integer', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required'     => 'Vehicle title is required.',
            'make.required'      => 'Vehicle make is required.',
            'model.required'     => 'Vehicle model is required.',
            'year.required'      => 'Vehicle year is required.',
            'price.required'     => 'Vehicle price is required.',
            'condition.required' => 'Vehicle condition is required.',
            'vin.unique'         => 'This VIN already exists.',
            'images.*.mimes'     => 'Allowed image formats: JPG, JPEG, PNG, WEBP, AVIF, GIF, BMP.',
            'images.*.max'       => 'Each image must not exceed 5MB.',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'make'     => $this->make ? trim($this->make) : null,
            'model'    => $this->model ? trim($this->model) : null,
            'title'    => $this->title ? trim($this->title) : null,
            'currency' => strtoupper($this->currency ?? 'USD'),
            'status'   => $this->status ?? 'draft',
        ]);
    }
}