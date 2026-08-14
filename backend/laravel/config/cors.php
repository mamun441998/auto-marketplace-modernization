<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    */

    'paths' => [
        'api/*',
        'sanctum/csrf-cookie',
    ],

    'allowed_methods' => [
        '*',
    ],

    'allowed_origins' => array_values(array_filter([

        // Local development
        'http://127.0.0.1:3000',
        'http://localhost:3000',
        'http://127.0.0.1:3001',
        'http://localhost:3001',
        'http://127.0.0.1:3002',
        'http://localhost:3002',

        // Production URLs from env (custom domains). Set these in Render:
        //   FRONTEND_URL, DEALER_ADMIN_URL, ADMIN_URL
        env('FRONTEND_URL'),
        env('DEALER_ADMIN_URL'),
        env('ADMIN_URL'),

    ])),

    // Allow every Vercel deployment (production + preview builds) without
    // having to whitelist each auto-generated URL.
    'allowed_origins_patterns' => [
        '#^https://.*\.vercel\.app$#',
    ],

    'allowed_headers' => [
        '*',
    ],

    'exposed_headers' => [],

    'max_age' => 0,

    /*
    |--------------------------------------------------------------------------
    | Bearer Token Authentication
    |--------------------------------------------------------------------------
    */

    'supports_credentials' => false,

];