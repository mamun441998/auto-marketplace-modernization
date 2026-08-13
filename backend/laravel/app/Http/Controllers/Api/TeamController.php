<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Team\StoreTeamMemberRequest;
use App\Http\Requests\Team\UpdateTeamMemberRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Throwable;

class TeamController extends Controller
{
    /**
     * Team list = owner + members (+ plan usage)।
     */
    public function index(Request $request): JsonResponse
    {
        $dealer = $request->user()->currentDealer();

        if (! $dealer) {
            return response()->json([
                'success' => false,
                'message' => 'No dealership found for this account.',
            ], 404);
        }

        $owner = $dealer->user; // dealership owner (User)

        $members = User::where('dealer_id', $dealer->id)
            ->orderBy('created_at')
            ->get();

        $team = [];

        if ($owner) {
            $team[] = $this->formatMember($owner, true);
        }

        foreach ($members as $m) {
            $team[] = $this->formatMember($m, false);
        }

        $limit = $owner?->planLimit('team_members'); // null = unlimited
        $used  = count($team);

        return response()->json([
            'success' => true,
            'data'    => $team,
            'usage'   => [
                'used'      => $used,
                'limit'     => $limit,
                'can_add'   => is_null($limit) ? true : ($used < $limit),
                'unlimited' => is_null($limit),
            ],
        ]);
    }

    /**
     * নতুন team member add।
     */
    public function store(StoreTeamMemberRequest $request): JsonResponse
    {
        $dealer = $request->user()->currentDealer();

        if (! $dealer) {
            return response()->json([
                'success' => false,
                'message' => 'No dealership found for this account.',
            ], 404);
        }

        $owner = $dealer->user;

        // Owner-এর plan অনুযায়ী access + limit
        if (! $owner || ! $owner->hasActiveAccess()) {
            return response()->json([
                'success' => false,
                'code'    => 'subscription_required',
                'message' => 'An active subscription or trial is required to add team members.',
            ], 403);
        }

        $limit   = $owner->planLimit('team_members'); // null = unlimited
        $current = 1 + User::where('dealer_id', $dealer->id)->count(); // owner + members

        if (! is_null($limit) && $current >= $limit) {
            return response()->json([
                'success' => false,
                'code'    => 'limit_reached',
                'message' => "Your plan allows up to {$limit} team member(s). Upgrade to add more.",
            ], 403);
        }

        try {
            $data = $request->validated();

            $member = User::create([
                'name'          => $data['name'],
                'email'         => $data['email'],
                'password'      => Hash::make($data['password']),
                'role'          => 'dealer',           // system role
                'team_role'     => $data['team_role'], // manager | staff
                'member_status' => 'active',
                'dealer_id'     => $dealer->id,
                'status'        => 'active',
            ]);

            // সাথে সাথে login করতে পারবে (email verified ধরে নিলাম)
            $member->forceFill(['email_verified_at' => now()])->save();

            return response()->json([
                'success' => true,
                'message' => 'Team member added successfully.',
                'data'    => $this->formatMember($member, false),
            ], 201);

        } catch (Throwable $e) {
            Log::error('Team member store error', [
                'dealer_id' => $dealer->id,
                'message'   => $e->getMessage(),
                'line'      => $e->getLine(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Unable to add team member.',
            ], 500);
        }
    }

    /**
     * Team member-এর role পরিবর্তন।
     */
    public function updateRole(UpdateTeamMemberRequest $request, User $member): JsonResponse
    {
        $dealer = $request->user()->currentDealer();

        if (! $dealer || (int) $member->dealer_id !== (int) $dealer->id) {
            return response()->json([
                'success' => false,
                'message' => 'This team member does not belong to your dealership.',
            ], 403);
        }

        $member->update(['team_role' => $request->validated()['team_role']]);

        return response()->json([
            'success' => true,
            'message' => 'Role updated successfully.',
            'data'    => $this->formatMember($member->fresh(), false),
        ]);
    }

    /**
     * Team member remove (account delete)।
     */
    public function destroy(Request $request, User $member): JsonResponse
    {
        $dealer = $request->user()->currentDealer();

        if (! $dealer || (int) $member->dealer_id !== (int) $dealer->id) {
            return response()->json([
                'success' => false,
                'message' => 'This team member does not belong to your dealership.',
            ], 403);
        }

        // নিজেকে remove করা যাবে না
        if ((int) $member->id === (int) $request->user()->id) {
            return response()->json([
                'success' => false,
                'message' => 'You cannot remove yourself.',
            ], 422);
        }

        $member->tokens()->delete(); // সব device থেকে logout
        $member->delete();

        return response()->json([
            'success' => true,
            'message' => 'Team member removed successfully.',
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Helper
    |--------------------------------------------------------------------------
    */
    private function formatMember(User $u, bool $isOwner): array
    {
        return [
            'id'        => $u->id,
            'name'      => $u->name,
            'email'     => $u->email,
            'team_role' => $isOwner ? 'owner' : ($u->team_role ?: 'staff'),
            'status'    => $u->member_status ?: 'active',
            'is_owner'  => $isOwner,
            'initials'  => $u->initials,
            'joined_at' => optional($u->created_at)->toDateString(),
        ];
    }
}