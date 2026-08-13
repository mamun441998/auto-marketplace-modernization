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

    'allowed_origins' => [

        // Frontend (marketing + auth)
        'http://127.0.0.1:3000',
        'http://localhost:3000',

        // Dealer-Admin (dashboard)
        'http://127.0.0.1:3001',
        'http://localhost:3001',

        // Super Admin panel  ← ✅ নতুন যোগ হলো
        'http://127.0.0.1:3002',
        'http://localhost:3002',

    ],

    'allowed_origins_patterns' => [],

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