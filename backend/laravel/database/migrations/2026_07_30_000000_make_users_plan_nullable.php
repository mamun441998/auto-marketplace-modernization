<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * The original create_users_table defined `plan` as a NOT NULL enum
     * (default 'starter'). Registration stores `plan => null` during the trial
     * (no plan chosen yet), which violated the NOT NULL constraint and made
     * every signup fail with a 500. Make the column nullable.
     */
    public function up(): void
    {
        if (DB::getDriverName() === 'pgsql') {
            // Postgres enum() is a varchar + CHECK; only NOT NULL blocks nulls.
            DB::statement('ALTER TABLE users ALTER COLUMN plan DROP NOT NULL');
        } else {
            Schema::table('users', function (Blueprint $table) {
                $table->string('plan')->nullable()->change();
            });
        }
    }

    public function down(): void
    {
        if (DB::getDriverName() === 'pgsql') {
            DB::statement('ALTER TABLE users ALTER COLUMN plan SET NOT NULL');
        } else {
            Schema::table('users', function (Blueprint $table) {
                $table->string('plan')->nullable(false)->default('starter')->change();
            });
        }
    }
};
