<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('dealer_payment_settings')) {
            Schema::create('dealer_payment_settings', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('dealer_id')->unique();

                $table->text('stripe_secret_key')->nullable();
                $table->boolean('stripe_enabled')->default(false);

                $table->text('paypal_client_id')->nullable();
                $table->boolean('paypal_enabled')->default(false);

                $table->timestamps();

                $table->index('dealer_id');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('dealer_payment_settings');
    }
};