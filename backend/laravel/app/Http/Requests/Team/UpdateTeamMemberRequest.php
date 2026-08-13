<?php

namespace App\Http\Requests\Team;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTeamMemberRequest extends FormRequest
{
    public function authorize(): bool
    {
        return (bool) $this->user()?->canManageTeam();
    }

    public function rules(): array
    {
        return [
            'team_role' => ['required', Rule::in(['manager', 'staff'])],
        ];
    }

    public function messages(): array
    {
        return [
            'team_role.in' => 'Role must be manager or staff.',
        ];
    }
}