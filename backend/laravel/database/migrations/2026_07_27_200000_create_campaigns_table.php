<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('campaigns')) {
            return;
        }

        Schema::create('campaigns', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('dealer_id');

            $table->string('name');
            $table->string('subject');
            $table->text('body');

            // 'all' or a lead status (new | contacted | qualified | ...)
            $table->string('audience')->default('all');

            $table->string('status')->default('draft'); // draft | sent
            $table->unsignedInteger('recipients_count')->default(0);
            $table->timestamp('sent_at')->nullable();

            $table->timestamps();

            $table->index('dealer_id');
        });

        if (Schema::hasTable('dealers')) {
            Schema::table('campaigns', function (Blueprint $table) {
                $table->foreign('dealer_id')->references('id')->on('dealers')->cascadeOnDelete();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('campaigns');
    }
};