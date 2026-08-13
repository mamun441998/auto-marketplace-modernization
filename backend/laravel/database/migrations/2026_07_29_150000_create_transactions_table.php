<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('transactions')) {
            Schema::create('transactions', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('dealer_id');
                $table->unsignedBigInteger('vehicle_id')->nullable();

                $table->string('customer_name')->nullable();
                $table->string('customer_email')->nullable();

                $table->decimal('amount', 12, 2)->default(0);
                $table->string('currency', 8)->default('USD');

                $table->string('provider')->default('stripe');     // stripe | paypal
                $table->string('provider_reference')->nullable();  // Stripe Checkout Session id
                $table->string('status')->default('pending');      // pending | completed | failed | refunded

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
        Schema::dropIfExists('transactions');
    }
};