<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (
            Schema::hasTable('dealer_payment_settings') &&
            ! Schema::hasColumn('dealer_payment_settings', 'deposit_amount')
        ) {
            Schema::table('dealer_payment_settings', function (Blueprint $table) {
                $table->decimal('deposit_amount', 10, 2)->nullable()->after('paypal_enabled');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('dealer_payment_settings', 'deposit_amount')) {
            Schema::table('dealer_payment_settings', function (Blueprint $table) {
                $table->dropColumn('deposit_amount');
            });
        }
    }
};