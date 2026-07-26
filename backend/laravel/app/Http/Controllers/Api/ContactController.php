<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    /**
     * --------------------------------------------------------------------------
     * Store Contact Form
     * --------------------------------------------------------------------------
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'email' => [
                'required',
                'email:rfc,dns',
                'max:255',
            ],

            'subject' => [
                'nullable',
                'string',
                'max:255',
            ],

            'message' => [
                'required',
                'string',
                'max:5000',
            ],
        ]);

        /*
        |--------------------------------------------------------------------------
        | TODO
        |--------------------------------------------------------------------------
        | Later we will:
        | - Save to database
        | - Send email notification
        | - Create CRM Lead
        | - Notify Admin
        */

        Log::info('Contact Form Submitted', [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'subject' => $validated['subject'] ?? null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Thank you. Your message has been received.',
        ]);
    }
}