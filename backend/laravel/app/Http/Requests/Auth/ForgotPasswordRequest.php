<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class ForgotPasswordRequest extends FormRequest
{
    /**
     * Authorize
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Validation Rules
     */
    public function rules(): array
    {
        return [

            'email' => [
                'required',
                'email:rfc,dns',
                'max:255',
            ],

        ];
    }

    /**
     * Prepare Data
     */
    protected function prepareForValidation(): void
    {
        $this->merge([

            'email' => strtolower(
                trim((string) $this->email)
            ),

        ]);
    }

    /**
     * Custom Messages
     */
    public function messages(): array
    {
        return [

            'email.required' => 'Email address is required.',

            'email.email' => 'Please enter a valid email address.',

            'email.exists' => 'No account found with this email address.',

        ];
    }
}