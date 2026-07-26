<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class ResetPasswordRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'email' => strtolower(trim((string) $this->email)),
            'code'  => trim((string) $this->code),
        ]);
    }

    public function rules(): array
    {
        return [
            'email'    => ['required', 'email'],
            'code'     => ['required', 'digits:6'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ];
    }

    public function messages(): array
    {
        return [
            'code.required'      => 'The verification code is required.',
            'code.digits'        => 'The verification code must be 6 digits.',
            'password.confirmed' => 'The password confirmation does not match.',
            'password.min'       => 'Password must be at least 8 characters.',
        ];
    }
}