<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();

            // Relationships
            $table->foreignId('dealer_id')
                ->nullable()
                ->constrained('dealers')
                ->nullOnDelete();

            $table->foreignId('vehicle_id')
                ->nullable()
                ->constrained('vehicles')
                ->nullOnDelete();

            // Contact info
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->text('message')->nullable();

            // Pipeline
            $table->enum('status', ['new', 'contacted', 'qualified', 'closed', 'lost'])
                ->default('new');

            $table->enum('source', ['website', 'whatsapp', 'phone', 'walk_in', 'other'])
                ->default('website');

            $table->timestamps();
            $table->softDeletes();

            // Helpful indexes
            $table->index(['dealer_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};