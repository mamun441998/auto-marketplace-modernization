<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AdminUserController extends Controller
{
    /** GET /api/admin/users — list users + role counts. */
    public function index(Request $request): JsonResponse
    {
        $q = User::query();

        if ($s = trim((string) $request->query('search', ''))) {
            $q->where(function ($w) use ($s) {
                $w->where('name', 'ilike', "%{$s}%")->orWhere('email', 'ilike', "%{$s}%");
            });
        }

        $role = $request->query('role');
        if ($role && $role !== 'all') {
            $q->where('role', $role);
        }

        $users = $q->latest()->paginate(min((int) $request->query('per_page', 15), 50));

        return response()->json([
            'success' => true,
            'users'   => collect($users->items())->map(fn ($u) => $this->present($u)),
            'meta'    => [
                'current_page' => $users->currentPage(),
                'last_page'    => $users->lastPage(),
                'per_page'     => $users->perPage(),
                'total'        => $users->total(),
            ],
            'counts' => [
                'total'       => User::count(),
                'super_admin' => User::where('role', 'super_admin')->count(),
                'admin'       => User::where('role', 'admin')->count(),
                'dealer'      => User::where('role', 'dealer')->count(),
            ],
        ]);
    }

    /** POST /api/admin/users — create a new admin / staff account. */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'     => ['required', 'string', 'max:120'],
            'email'    => ['required', 'email', 'max:150', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'role'     => ['required', Rule::in(['admin', 'super_admin'])],
        ]);

        $user = User::create([
            'name'              => $data['name'],
            'email'             => strtolower(trim($data['email'])),
            'password'          => $data['password'], // hashed by cast
            'role'              => $data['role'],
            'status'            => 'active',
            'email_verified_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Team member created.',
            'user'    => $this->present($user),
        ], 201);
    }

    /** PATCH /api/admin/users/{user}/role */
    public function updateRole(Request $request, User $user): JsonResponse
    {
        if ($user->id === $request->user()->id) {
            return response()->json(['success' => false, 'message' => "You can't change your own role."], 422);
        }

        $data = $request->validate([
            'role' => ['required', Rule::in(['dealer', 'admin', 'super_admin'])],
        ]);

        $user->role = $data['role'];
        $user->save();

        return response()->json(['success' => true, 'message' => 'Role updated.', 'user' => $this->present($user)]);
    }

    /** PATCH /api/admin/users/{user}/status */
    public function updateStatus(Request $request, User $user): JsonResponse
    {
        if ($user->id === $request->user()->id) {
            return response()->json(['success' => false, 'message' => "You can't change your own status."], 422);
        }

        $data = $request->validate([
            'status' => ['required', Rule::in(['active', 'suspended'])],
        ]);

        $user->status = $data['status'];
        $user->save();

        return response()->json(['success' => true, 'message' => 'Status updated.', 'user' => $this->present($user)]);
    }

    /** DELETE /api/admin/users/{user} */
    public function destroy(Request $request, User $user): JsonResponse
    {
        if ($user->id === $request->user()->id) {
            return response()->json(['success' => false, 'message' => "You can't delete your own account."], 422);
        }

        // Don't delete a dealer owner (would break their dealership).
        if ($user->dealer()->exists()) {
            return response()->json(['success' => false, 'message' => 'This user owns a dealership. Remove the dealership first.'], 422);
        }

        $user->delete();

        return response()->json(['success' => true, 'message' => 'User deleted.']);
    }

    private function present(User $u): array
    {
        return [
            'id'         => $u->id,
            'name'       => $u->name,
            'email'      => $u->email,
            'role'       => $u->role,
            'status'     => $u->status,
            'phone'      => $u->phone,
            'avatar_url' => $u->avatar_url,
            'created_at' => optional($u->created_at)->toDateTimeString(),
        ];
    }
}