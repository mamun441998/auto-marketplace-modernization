<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('email_settings')) {
            return;
        }

        Schema::create('email_settings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('dealer_id')->unique();

            $table->string('provider')->default('smtp'); // sendgrid | brevo | mailgun | ses | smtp
            $table->string('host')->nullable();
            $table->unsignedInteger('port')->default(587);
            $table->string('username')->nullable();
            $table->text('password')->nullable();          // stored encrypted (model cast)
            $table->string('encryption')->default('tls');  // tls | ssl | none

            $table->string('from_email')->nullable();
            $table->string('from_name')->nullable();

            $table->boolean('is_active')->default(false);

            $table->timestamps();
        });

        if (Schema::hasTable('dealers')) {
            Schema::table('email_settings', function (Blueprint $table) {
                $table->foreign('dealer_id')->references('id')->on('dealers')->cascadeOnDelete();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('email_settings');
    }
};