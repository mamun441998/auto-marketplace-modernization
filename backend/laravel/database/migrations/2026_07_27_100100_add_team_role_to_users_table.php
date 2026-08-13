<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // team-level role: owner | manager | staff
            if (! Schema::hasColumn('users', 'team_role')) {
                $table->string('team_role')->default('owner')->after('role');
            }
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'team_role')) {
                $table->dropColumn('team_role');
            }
        });
    }
};