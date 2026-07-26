<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class VerifyEmailRequest extends FormRequest
{
    public function authorize(): bool { return true; }

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
            'email' => ['required', 'email'],
            'code'  => ['required', 'digits:6'],
        ];
    }
}