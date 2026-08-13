<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('support_tickets')) {
            Schema::create('support_tickets', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('dealer_id');
                $table->unsignedBigInteger('user_id')->nullable();
                $table->string('subject');
                $table->string('status')->default('open');     // open | pending | closed
                $table->string('priority')->default('medium');  // low | medium | high
                $table->timestamp('last_reply_at')->nullable();
                $table->timestamps();

                $table->index('dealer_id');
                $table->index('status');
            });
        }

        if (! Schema::hasTable('support_ticket_messages')) {
            Schema::create('support_ticket_messages', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('ticket_id');
                $table->string('author_type');   // dealer | admin
                $table->unsignedBigInteger('author_id')->nullable();
                $table->string('author_name')->nullable();
                $table->text('body');
                $table->timestamps();

                $table->index('ticket_id');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('support_ticket_messages');
        Schema::dropIfExists('support_tickets');
    }
};