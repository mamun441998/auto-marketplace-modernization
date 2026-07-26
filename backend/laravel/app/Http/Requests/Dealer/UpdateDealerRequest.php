<?php

namespace App\Http\Requests\Dealer;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDealerRequest extends FormRequest
{
    /**
     * Authorize — route-এ auth:sanctum + controller-এ ownership check আছে।
     */
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * Normalize (partial update — শুধু পাঠানো field গুলো)।
     */
    protected function prepareForValidation(): void
    {
        $merge = [];

        if ($this->has('name')) {
            $merge['name'] = trim((string) $this->name);
        }
        if ($this->has('email')) {
            $merge['email'] = $this->email ? strtolower(trim((string) $this->email)) : null;
        }

        if ($merge) {
            $this->merge($merge);
        }
    }

    /**
     * Validation Rules
     * (logo/cover = আলাদা upload endpoint; status/is_verified/is_featured = admin-only, এখানে নেই)
     */
    public function rules(): array
    {
        $dealer = $this->route('dealer');

        return [

            // Dealer Information
            'name' => ['sometimes', 'string', 'min:3', 'max:255'],

            'slug' => [
                'sometimes', 'string', 'min:3', 'max:255',
                Rule::unique('dealers', 'slug')->ignore($dealer),
            ],

            'email' => [
                'nullable', 'email', 'max:255',
                Rule::unique('dealers', 'email')->ignore($dealer),
            ],

            'phone'       => ['nullable', 'string', 'max:30'],
            'website'     => ['nullable', 'url', 'max:255'],
            'description' => ['nullable', 'string', 'max:3000'],

            // Address
            'address'     => ['nullable', 'string', 'max:500'],
            'city'        => ['nullable', 'string', 'max:100'],
            'state'       => ['nullable', 'string', 'max:100'],
            'postal_code' => ['nullable', 'string', 'max:30'],
            'country'     => ['nullable', 'string', 'max:100'],

            // Location
            'latitude'    => ['nullable', 'numeric', 'between:-90,90'],
            'longitude'   => ['nullable', 'numeric', 'between:-180,180'],

            // Business
            'license_number' => ['nullable', 'string', 'max:255'],
            'tax_number'     => ['nullable', 'string', 'max:255'],

            // Social Links
            'facebook'  => ['nullable', 'url', 'max:255'],
            'instagram' => ['nullable', 'url', 'max:255'],
            'linkedin'  => ['nullable', 'url', 'max:255'],
            'youtube'   => ['nullable', 'url', 'max:255'],

            // Website Builder
            'theme' => ['nullable', 'string', 'max:50'],

            // SEO
            'meta_title'       => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:1000'],
        ];
    }

    /**
     * Custom Messages
     */
    public function messages(): array
    {
        return [
            'name.min'      => 'Dealership name must be at least 3 characters.',
            'slug.unique'   => 'This slug is already taken.',
            'email.email'   => 'Please enter a valid email address.',
            'email.unique'  => 'This dealership email is already in use.',
            'website.url'   => 'Website must be a valid URL (e.g. https://...).',
        ];
    }
}