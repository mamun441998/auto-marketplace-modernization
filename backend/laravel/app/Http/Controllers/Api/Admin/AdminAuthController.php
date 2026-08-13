<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AdminAuthController extends Controller
{
    /** POST /api/admin/login */
    public function login(Request $request): JsonResponse
    {
        $data = $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', strtolower(trim($data['email'])))->first();

        if (! $user || ! Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages(['email' => ['Invalid email or password.']]);
        }

        if (! in_array($user->role, ['super_admin', 'admin'], true)) {
            return response()->json(['success' => false, 'message' => 'You are not authorized to access the admin panel.'], 403);
        }

        if (! $user->isActive()) {
            return response()->json(['success' => false, 'message' => 'Your account is not active.'], 403);
        }

        $user->tokens()->delete();
        $token = $user->createToken('admin_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login successful.',
            'token'   => $token,
            'user'    => $this->present($user),
        ]);
    }

    /** GET /api/admin/me */
    public function me(Request $request): JsonResponse
    {
        return response()->json(['success' => true, 'user' => $this->present($request->user())]);
    }

    /** POST /api/admin/logout */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()?->delete();
        return response()->json(['success' => true, 'message' => 'Logged out.']);
    }

    private function present(User $u): array
    {
        return [
            'id'         => $u->id,
            'name'       => $u->name,
            'email'      => $u->email,
            'role'       => $u->role,
            'avatar_url' => $u->avatar_url,
        ];
    }
}