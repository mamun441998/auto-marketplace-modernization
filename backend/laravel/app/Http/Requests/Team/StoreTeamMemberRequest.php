<?php

namespace App\Http\Requests\Team;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTeamMemberRequest extends FormRequest
{
    public function authorize(): bool
    {
        // শুধু owner / manager team member add করতে পারবে
        return (bool) $this->user()?->canManageTeam();
    }

    public function rules(): array
    {
        return [
            'name'      => ['required', 'string', 'max:255'],
            'email'     => ['required', 'email', 'max:255', 'unique:users,email'],
            'password'  => ['required', 'string', 'min:8'],
            'team_role' => ['required', Rule::in(['manager', 'staff'])],
        ];
    }

    public function messages(): array
    {
        return [
            'email.unique'      => 'This email is already registered.',
            'team_role.in'      => 'Role must be manager or staff.',
            'password.min'      => 'Password must be at least 8 characters.',
        ];
    }
}