<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                => $this->id,
            'name'              => $this->name,
            'email'             => $this->email,
            'role'              => $this->role,
            'status'            => $this->status,
            'dealer_id'         => $this->dealer_id,
            'plan'              => $this->plan,

            // ✅ এটাই মূল fix — frontend এই field দিয়ে verified কিনা চেক করে
            'email_verified_at' => $this->email_verified_at,
            'email_verified'    => (bool) $this->email_verified_at,

            'trial_ends_at'     => $this->trial_ends_at,
            'created_at'        => $this->created_at,
            'updated_at'        => $this->updated_at,
        ];
    }
}