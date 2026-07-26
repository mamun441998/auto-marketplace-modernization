<?php

namespace App\Http\Requests\Lead;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreLeadRequest extends FormRequest
{
    // Public endpoint — anyone can submit a lead.
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Which dealer / vehicle this lead is for
            'dealer_id'  => ['required', 'integer', 'exists:dealers,id'],
            'vehicle_id' => ['nullable', 'integer', 'exists:vehicles,id'],

            // Contact info (name required; at least email OR phone required)
            'name'    => ['required', 'string', 'max:150'],
            'email'   => ['nullable', 'email:rfc', 'max:150', 'required_without:phone'],
            'phone'   => ['nullable', 'string', 'max:30', 'required_without:email'],
            'message' => ['nullable', 'string', 'max:5000'],

            // Where it came from
            'source' => [
                'nullable',
                Rule::in(['website', 'whatsapp', 'phone', 'walk_in', 'other']),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'        => 'Your name is required.',
            'dealer_id.required'   => 'Dealer is required.',
            'dealer_id.exists'     => 'This dealership does not exist.',
            'vehicle_id.exists'    => 'The selected vehicle does not exist.',
            'email.required_without' => 'Please provide an email or a phone number.',
            'phone.required_without' => 'Please provide a phone or an email address.',
            'email.email'          => 'Please enter a valid email address.',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'name'   => $this->name ? trim($this->name) : null,
            'email'  => $this->email ? strtolower(trim($this->email)) : null,
            'phone'  => $this->phone ? trim($this->phone) : null,
            'source' => $this->source ?: 'website',
        ]);
    }
}