<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('templates')) {
            return;
        }

        Schema::create('templates', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('dealer_id');

            $table->string('name');
            $table->string('channel')->default('email'); // email | whatsapp
            $table->string('subject')->nullable();        // for email
            $table->text('body');

            $table->timestamps();

            $table->index('dealer_id');
        });

        if (Schema::hasTable('dealers')) {
            Schema::table('templates', function (Blueprint $table) {
                $table->foreign('dealer_id')->references('id')->on('dealers')->cascadeOnDelete();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('templates');
    }
};