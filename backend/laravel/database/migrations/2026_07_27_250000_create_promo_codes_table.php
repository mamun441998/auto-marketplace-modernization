<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('promo_codes')) {
            Schema::create('promo_codes', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('dealer_id');
                $table->string('code');
                $table->string('type')->default('percent'); // percent | fixed
                $table->decimal('value', 10, 2)->default(0);
                $table->unsignedInteger('max_uses')->nullable(); // null = unlimited
                $table->unsignedInteger('used_count')->default(0);
                $table->date('expires_at')->nullable();
                $table->boolean('is_active')->default(true);
                $table->string('description')->nullable();
                $table->timestamps();

                $table->index('dealer_id');
                $table->unique(['dealer_id', 'code']);
            });

            if (Schema::hasTable('dealers')) {
                Schema::table('promo_codes', function (Blueprint $table) {
                    $table->foreign('dealer_id')
                        ->references('id')->on('dealers')
                        ->onDelete('cascade');
                });
            }
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('promo_codes');
    }
};
