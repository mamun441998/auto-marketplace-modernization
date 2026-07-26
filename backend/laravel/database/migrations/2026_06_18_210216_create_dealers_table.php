<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('dealers', function (Blueprint $table) {

        /*
        |--------------------------------------------------------------------------
        | Identity
        |--------------------------------------------------------------------------
        */

        $table->id();

        $table->uuid('uuid')->unique();

        $table->foreignId('user_id')
            ->constrained()
            ->cascadeOnDelete();

        /*
        |--------------------------------------------------------------------------
        | Dealer Information
        |--------------------------------------------------------------------------
        */

        $table->string('name');

        $table->string('slug')->unique();

        $table->string('email')->nullable()->unique();

        $table->string('phone')->nullable();

        $table->string('website')->nullable();

        $table->longText('description')->nullable();

        /*
        |--------------------------------------------------------------------------
        | Address
        |--------------------------------------------------------------------------
        */

        $table->text('address')->nullable();

        $table->string('city')->nullable();

        $table->string('state')->nullable();

        $table->string('postal_code')->nullable();

        $table->string('country')->nullable();

        /*
        |--------------------------------------------------------------------------
        | Location
        |--------------------------------------------------------------------------
        */

        $table->decimal('latitude',10,7)->nullable();

        $table->decimal('longitude',10,7)->nullable();

        /*
        |--------------------------------------------------------------------------
        | Business
        |--------------------------------------------------------------------------
        */

        $table->string('license_number')->nullable();

        $table->string('tax_number')->nullable();

        /*
        |--------------------------------------------------------------------------
        | Social Media
        |--------------------------------------------------------------------------
        */

        $table->string('facebook')->nullable();

        $table->string('instagram')->nullable();

        $table->string('linkedin')->nullable();

        $table->string('youtube')->nullable();

        /*
        |--------------------------------------------------------------------------
        | Branding
        |--------------------------------------------------------------------------
        */

        $table->string('logo')->nullable();

        $table->string('cover_image')->nullable();

        $table->string('theme')->default('default');

        /*
        |--------------------------------------------------------------------------
        | SEO
        |--------------------------------------------------------------------------
        */

        $table->string('meta_title')->nullable();

        $table->text('meta_description')->nullable();

        /*
        |--------------------------------------------------------------------------
        | Status
        |--------------------------------------------------------------------------
        */

        $table->enum('status',[
            'pending',
            'active',
            'suspended',
        ])->default('pending');

        $table->boolean('is_active')->default(true);

        $table->boolean('is_verified')->default(false);

        $table->boolean('is_featured')->default(false);

        /*
        |--------------------------------------------------------------------------
        | Metadata
        |--------------------------------------------------------------------------
        */

        $table->timestamps();

        $table->softDeletes();
    });
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dealers');
    }
};