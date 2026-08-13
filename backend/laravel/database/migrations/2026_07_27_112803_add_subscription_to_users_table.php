<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (! Schema::hasColumn('users', 'trial_ends_at')) {
                $table->timestamp('trial_ends_at')->nullable();
            }
            if (! Schema::hasColumn('users', 'plan')) {
                // starter | professional | enterprise | null
                $table->string('plan')->nullable();
            }
            if (! Schema::hasColumn('users', 'subscription_status')) {
                // trialing | active | past_due | canceled | inactive
                $table->string('subscription_status')->default('trialing');
            }
            if (! Schema::hasColumn('users', 'subscription_ends_at')) {
                $table->timestamp('subscription_ends_at')->nullable();
            }
            if (! Schema::hasColumn('users', 'stripe_customer_id')) {
                $table->string('stripe_customer_id')->nullable();
            }
            if (! Schema::hasColumn('users', 'stripe_subscription_id')) {
                $table->string('stripe_subscription_id')->nullable();
            }
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'plan',
                'subscription_status',
                'subscription_ends_at',
                'stripe_customer_id',
                'stripe_subscription_id',
            ]);
            // trial_ends_at রাখলাম (আগে থাকতে পারে)
        });
    }
};