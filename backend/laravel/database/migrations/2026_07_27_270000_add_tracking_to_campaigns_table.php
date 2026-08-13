<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('campaigns')) {
            Schema::table('campaigns', function (Blueprint $table) {
                if (! Schema::hasColumn('campaigns', 'opens_count')) {
                    $table->unsignedInteger('opens_count')->default(0)->after('recipients_count');
                }
                if (! Schema::hasColumn('campaigns', 'clicks_count')) {
                    $table->unsignedInteger('clicks_count')->default(0)->after('opens_count');
                }
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('campaigns')) {
            Schema::table('campaigns', function (Blueprint $table) {
                foreach (['opens_count', 'clicks_count'] as $col) {
                    if (Schema::hasColumn('campaigns', $col)) {
                        $table->dropColumn($col);
                    }
                }
            });
        }
    }
};