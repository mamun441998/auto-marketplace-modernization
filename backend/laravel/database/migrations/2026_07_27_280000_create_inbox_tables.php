<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('conversations')) {
            Schema::create('conversations', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('dealer_id');
                $table->string('token', 64)->unique();          // visitor resume key (no login needed)
                $table->string('visitor_name')->nullable();
                $table->string('visitor_email')->nullable();
                $table->string('visitor_phone')->nullable();
                $table->string('status')->default('open');        // open | closed
                $table->unsignedInteger('unread_dealer')->default(0); // unread by dealer
                $table->timestamp('last_message_at')->nullable();
                $table->timestamps();

                $table->index('dealer_id');
                $table->index(['dealer_id', 'status']);
            });

            if (Schema::hasTable('dealers')) {
                Schema::table('conversations', function (Blueprint $table) {
                    $table->foreign('dealer_id')->references('id')->on('dealers')->onDelete('cascade');
                });
            }
        }

        if (! Schema::hasTable('messages')) {
            Schema::create('messages', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('conversation_id');
                $table->string('sender', 20)->default('customer'); // customer | dealer
                $table->text('body');
                $table->timestamp('read_at')->nullable();
                $table->timestamps();

                $table->index('conversation_id');
            });

            if (Schema::hasTable('conversations')) {
                Schema::table('messages', function (Blueprint $table) {
                    $table->foreign('conversation_id')->references('id')->on('conversations')->onDelete('cascade');
                });
            }
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('messages');
        Schema::dropIfExists('conversations');
    }
};