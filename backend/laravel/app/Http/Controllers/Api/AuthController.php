<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Http\Requests\Auth\VerifyEmailRequest;

use App\Http\Resources\UserResource;

use App\Mail\VerifyEmailMail;
use App\Mail\ResetPasswordMail;

use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;

use Illuminate\Support\Str;

use Throwable;

class AuthController extends Controller
{
    /** Register New Dealer */
    public function register(RegisterRequest $request): JsonResponse
    {
        DB::beginTransaction();

        try {
            $user = User::create([
                'name'                => trim($request->name),
                'email'               => strtolower(trim($request->email)),
                'password'            => $request->password,
                'status'              => 'active',
                'role'                => 'dealer',
                'trial_ends_at'       => now()->addDays((int) config('plans.trial_days', 14)),
                'subscription_status' => 'trialing',
                'plan'                => null,
            ]);

            DB::commit();

        } catch (QueryException $exception) {
            DB::rollBack();

            if (in_array($exception->getCode(), ['23000', '23505'])) {
                return response()->json([
                    'success' => false,
                    'message' => 'Email already exists.',
                ], 422);
            }

            Log::error('Register DB Error', [
                'message' => $exception->getMessage(),
                'line'    => $exception->getLine(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Unable to create account.',
            ], 500);

        } catch (Throwable $exception) {
            DB::rollBack();

            Log::error('Register Error', [
                'message' => $exception->getMessage(),
                'line'    => $exception->getLine(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Unable to create account.',
            ], 500);
        }

        // The account is committed. Store the code now, but SEND the email AFTER
        // the response is flushed (defer) so a slow/blocked mail transport can
        // never delay or time out the signup response.
        $code = (string) random_int(100000, 999999);
        Cache::put('email_verification_' . $user->id, $code, now()->addMinutes(10));

        defer(function () use ($user, $code) {
            try {
                Mail::to($user->email)->send(new VerifyEmailMail($user, $code));
            } catch (Throwable $exception) {
                Log::error('Verification email failed to send', [
                    'user_id' => $user->id,
                    'message' => $exception->getMessage(),
                ]);
            }
        });

        return response()->json([
            'success' => true,
            'message' => 'Account created successfully. Please check your email for the verification code.',
            'user'    => new UserResource($user),
        ], 201);
    }

    /** Login */
    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::where('email', strtolower(trim($request->email)))->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Invalid email or password.'],
            ]);
        }

        if (!$user->isActive()) {
            return response()->json([
                'success' => false,
                'message' => 'Your account has been suspended.',
            ], 403);
        }

        if (!$user->hasVerifiedEmail()) {
            return response()->json([
                'success' => false,
                'message' => 'Please verify your email address before logging in.',
            ], 403);
        }

        $user->tokens()->delete();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login successful.',
            'token'   => $token,
            'user'    => new UserResource($user),
        ]);
    }

    /** Current User */
    public function user(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
            'user'    => new UserResource($request->user()),
        ]);
    }

    /** Logout */
    public function logout(Request $request): JsonResponse
    {
        if ($request->user()) {
            $request->user()->currentAccessToken()?->delete();
        }

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully.',
        ]);
    }

        /** Change Password (authenticated) */
    public function changePassword(Request $request): JsonResponse
    {
        $data = $request->validate([
            'current_password' => ['required', 'string'],
            'new_password'     => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = $request->user();

        if (! Hash::check($data['current_password'], $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Current password is incorrect.',
            ], 422);
        }

        $user->forceFill(['password' => $data['new_password']])->save();

        // Log out other sessions for safety, keep current token.
        $current = $request->user()->currentAccessToken();
        $user->tokens()->where('id', '!=', $current?->id)->delete();

        return response()->json([
            'success' => true,
            'message' => 'Password changed successfully.',
        ]);
    }

    /** Forgot Password */
    public function forgotPassword(ForgotPasswordRequest $request): JsonResponse
    {
        $user = User::where('email', strtolower(trim($request->email)))->first();

        if ($user) {
            $code = (string) random_int(100000, 999999);
            Cache::put('password_reset_' . $user->email, $code, now()->addMinutes(60));

            defer(function () use ($user, $code) {
                try {
                    Mail::to($user->email)->send(new ResetPasswordMail($user, $code));
                } catch (Throwable $e) {
                    Log::error('Forgot Password Mail Error', [
                        'message' => $e->getMessage(),
                    ]);
                }
            });
        }

        return response()->json([
            'success' => true,
            'message' => 'If your email exists in our system, a password reset code has been sent.',
        ]);
    }

    /** Reset Password */
    public function resetPassword(ResetPasswordRequest $request): JsonResponse
    {
        $user = User::where('email', strtolower(trim($request->email)))->first();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Invalid reset request.'], 422);
        }

        $cachedCode = Cache::get('password_reset_' . $user->email);

        if (!$cachedCode) {
            return response()->json(['success' => false, 'message' => 'Password reset code has expired.'], 422);
        }
        if ($cachedCode !== $request->code) {
            return response()->json(['success' => false, 'message' => 'Invalid password reset code.'], 422);
        }

        $user->forceFill([
            'password'       => $request->password,
            'remember_token' => Str::random(60),
        ])->save();

        Cache::forget('password_reset_' . $user->email);
        $user->tokens()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Password reset successfully.',
        ]);
    }

    /** Verify Email (public — email + code) */
    public function verifyEmail(VerifyEmailRequest $request): JsonResponse
    {
        $user = User::where('email', strtolower(trim($request->email)))->first();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Invalid verification request.'], 422);
        }
        if ($user->hasVerifiedEmail()) {
            return response()->json(['success' => true, 'message' => 'Email already verified.']);
        }

        $cachedCode = Cache::get('email_verification_' . $user->id);

        if (!$cachedCode) {
            return response()->json(['success' => false, 'message' => 'Verification code expired.'], 422);
        }
        if ($cachedCode !== $request->code) {
            return response()->json(['success' => false, 'message' => 'Invalid verification code.'], 422);
        }

        $user->markEmailAsVerified();
        Cache::forget('email_verification_' . $user->id);

        $user->tokens()->delete();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Email verified successfully.',
            'token'   => $token,
            'user'    => new UserResource($user),
        ]);
    }

    /** Resend Verification Code (public — email) */
    public function resendVerification(Request $request): JsonResponse
    {
        $user = User::where('email', strtolower(trim((string) $request->email)))->first();

        if ($user && !$user->hasVerifiedEmail()) {
            $code = (string) random_int(100000, 999999);
            Cache::put('email_verification_' . $user->id, $code, now()->addMinutes(10));

            defer(function () use ($user, $code) {
                try {
                    Mail::to($user->email)->send(new VerifyEmailMail($user, $code));
                } catch (Throwable $e) {
                    Log::error('Resend Verification Mail Error', [
                        'message' => $e->getMessage(),
                    ]);
                }
            });
        }

        return response()->json([
            'success' => true,
            'message' => 'A new code has been sent to your email.',
        ]);
    }

    /** Dealer Dashboard */
    public function dashboard(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'success' => true,
            'message' => 'Dealer dashboard loaded successfully.',
            'user'    => new UserResource($user),
            'stats'   => [
                'vehicles'        => 0,
                'active_listings' => 0,
                'leads'           => 0,
                'subscription'    => 'Starter',
                'trial_days_left' => $user->trial_ends_at
                    ? max(0, now()->diffInDays($user->trial_ends_at, false))
                    : 0,
            ],
        ]);
    }
}