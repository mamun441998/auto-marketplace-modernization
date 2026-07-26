<?php

namespace App\Http\Requests\Dealer;

use Illuminate\Foundation\Http\FormRequest;

class StoreDealerRequest extends FormRequest
{
    /**
     * Authorize — route-এ auth:sanctum আছে, তবু double-check।
     */
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * Normalize input before validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'name'  => trim((string) $this->name),
            'email' => $this->email ? strtolower(trim((string) $this->email)) : null,
        ]);
    }

    /**
     * Validation Rules
     * (slug = server auto-generate, logo/cover = আলাদা upload endpoint — তাই এখানে নেই)
     */
    public function rules(): array
    {
        return [

            // Dealer Information
            'name'        => ['required', 'string', 'min:3', 'max:255'],
            'email'       => ['nullable', 'email', 'max:255', 'unique:dealers,email'],
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
            'name.required'  => 'Dealership name is required.',
            'name.min'       => 'Dealership name must be at least 3 characters.',
            'email.email'    => 'Please enter a valid email address.',
            'email.unique'   => 'This dealership email is already in use.',
            'website.url'    => 'Website must be a valid URL (e.g. https://...).',
            'facebook.url'   => 'Facebook must be a valid URL.',
            'instagram.url'  => 'Instagram must be a valid URL.',
            'linkedin.url'   => 'LinkedIn must be a valid URL.',
            'youtube.url'    => 'YouTube must be a valid URL.',
        ];
    }
}