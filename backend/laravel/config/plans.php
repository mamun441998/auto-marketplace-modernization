<?php

return [

    // Free trial length (days)
    'trial_days' => 14,

    // During trial, dealers get this plan's access.
    'trial_plan' => 'professional',

    // The plans (must match the pricing page)
    'plans' => [

        'starter' => [
            'name'             => 'Starter',
            'price'            => 49,
            'currency'         => 'USD',
            'interval'         => 'month',
            'vehicle_listings' => 50,
            'team_members'     => 1,
            'features' => [
                'lead_management'    => true,
                'website_builder'    => true,
                'basic_analytics'    => true,
                'advanced_analytics' => false,
                'ai_pricing'         => false,
                'auto_auction'       => false,
                'custom_erp'         => false,
                'api_access'         => false,
            ],
            'support' => 'email',
        ],

        'professional' => [
            'name'             => 'Professional',
            'price'            => 129,
            'currency'         => 'USD',
            'interval'         => 'month',
            'vehicle_listings' => 500,
            'team_members'     => 10,
            'features' => [
                'lead_management'    => true,
                'website_builder'    => true,
                'basic_analytics'    => true,
                'advanced_analytics' => true,
                'ai_pricing'         => true,
                'auto_auction'       => true,
                'custom_erp'         => false,
                'api_access'         => true,
            ],
            'support' => 'priority',
        ],

        'enterprise' => [
            'name'             => 'Enterprise',
            'price'            => 299,
            'currency'         => 'USD',
            'interval'         => 'month',
            'vehicle_listings' => null,   // null = unlimited
            'team_members'     => null,   // null = unlimited
            'features' => [
                'lead_management'    => true,
                'website_builder'    => true,
                'basic_analytics'    => true,
                'advanced_analytics' => true,
                'ai_pricing'         => true,
                'auto_auction'       => true,
                'custom_erp'         => true,
                'api_access'         => true,
            ],
            'support' => 'dedicated',
        ],

    ],
];