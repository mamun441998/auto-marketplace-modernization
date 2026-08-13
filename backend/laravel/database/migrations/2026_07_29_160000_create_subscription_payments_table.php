<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('subscription_payments')) {
            Schema::create('subscription_payments', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('dealer_id');
                $table->unsignedBigInteger('user_id')->nullable();

                $table->string('plan_key');                 // starter | professional | enterprise
                $table->decimal('amount', 10, 2)->default(0);
                $table->string('currency', 8)->default('USD');

                $table->string('provider')->default('stripe');
                $table->string('provider_reference')->nullable(); // Stripe Checkout Session id
                $table->string('status')->default('pending');     // pending | completed | failed

                $table->timestamp('period_end')->nullable();       // next billing date
                $table->timestamp('paid_at')->nullable();
                $table->timestamps();

                $table->index('dealer_id');
                $table->index('status');
                $table->index('provider_reference');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('subscription_payments');
    }
};