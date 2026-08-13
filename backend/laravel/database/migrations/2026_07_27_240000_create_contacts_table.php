<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('contacts')) {
            Schema::create('contacts', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('dealer_id');
                $table->string('name')->nullable();
                $table->string('email')->nullable();
                $table->string('phone')->nullable();
                $table->string('source')->default('import'); // import, manual, lead
                $table->string('tag')->nullable();
                $table->timestamps();

                $table->index('dealer_id');
                $table->index(['dealer_id', 'email']);
                $table->index(['dealer_id', 'phone']);
            });

            // Add FK only if dealers table exists
            if (Schema::hasTable('dealers')) {
                Schema::table('contacts', function (Blueprint $table) {
                    $table->foreign('dealer_id')
                        ->references('id')->on('dealers')
                        ->onDelete('cascade');
                });
            }
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};