<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // add channel to campaigns (email | whatsapp)
        if (Schema::hasTable('campaigns') && ! Schema::hasColumn('campaigns', 'channel')) {
            Schema::table('campaigns', function (Blueprint $table) {
                $table->string('channel')->default('email')->after('audience');
            });
        }

        if (! Schema::hasTable('whatsapp_settings')) {
            Schema::create('whatsapp_settings', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('dealer_id')->unique();

                $table->string('provider')->default('meta'); // meta | twilio | custom
                $table->text('api_token')->nullable();        // encrypted (model cast)
                $table->string('phone_number_id')->nullable();// Meta Cloud API phone number id
                $table->string('from_number')->nullable();    // sender number (display)

                $table->boolean('is_active')->default(false);
                $table->timestamps();
            });

            if (Schema::hasTable('dealers')) {
                Schema::table('whatsapp_settings', function (Blueprint $table) {
                    $table->foreign('dealer_id')->references('id')->on('dealers')->cascadeOnDelete();
                });
            }
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('whatsapp_settings');
        if (Schema::hasTable('campaigns') && Schema::hasColumn('campaigns', 'channel')) {
            Schema::table('campaigns', function (Blueprint $table) {
                $table->dropColumn('channel');
            });
        }
    }
};