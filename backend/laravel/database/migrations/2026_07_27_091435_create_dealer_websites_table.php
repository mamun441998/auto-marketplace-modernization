<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dealer_websites', function (Blueprint $table) {
            $table->id();

            // One website per dealer
            $table->foreignId('dealer_id')
                ->unique()
                ->constrained('dealers')
                ->cascadeOnDelete();

            // Live status
            $table->boolean('is_published')->default(false);

            // Optional custom domain (later)
            $table->string('custom_domain')->nullable()->unique();

            // Whole builder config (branding, theme, hero, seo, tracking, etc.)
            $table->json('config')->nullable();

            // Quick-access tracking ids (also stored in config, but handy as columns)
            $table->string('meta_pixel_id')->nullable();
            $table->string('google_analytics_id')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dealer_websites');
    }
};