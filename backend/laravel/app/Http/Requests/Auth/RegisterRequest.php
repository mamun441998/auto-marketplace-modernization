<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'name' => [
                'required',
                'string',
                'min:2',
                'max:255',
            ],

            'email' => [
                'required',
                // ✅ FIX: local-এ শুধু rfc (DNS lookup বাদ), production-এ rfc+dns
                app()->isProduction() ? 'email:rfc,dns' : 'email:rfc',
                'max:255',
                'unique:users,email',
            ],

            'password' => [
                'required',
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers(),
            ],

            'plan' => [
                'nullable',
                'string',
                'in:starter,professional,enterprise',
            ],

        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'name'  => trim((string) $this->name),
            'email' => strtolower(trim((string) $this->email)),
            'plan'  => $this->plan ?: 'starter',
        ]);
    }

    public function messages(): array
    {
        return [
            'name.required'      => 'Full name is required.',

            'email.required'     => 'Email address is required.',
            'email.email'        => 'Please enter a valid email address.',
            'email.unique'       => 'This email address is already registered.',

            'password.required'  => 'Password is required.',
            'password.confirmed' => 'Passwords do not match.',
            'password.min'       => 'Password must be at least 8 characters.',
            // ✅ পরিষ্কার message যাতে user বোঝে
            'password.letters'   => 'Password must contain letters.',
            'password.mixed'     => 'Password must include both uppercase and lowercase letters.',
            'password.numbers'   => 'Password must include at least one number.',

            'plan.in'            => 'Invalid subscription plan.',
        ];
    }
}