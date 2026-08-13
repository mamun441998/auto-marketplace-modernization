<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('dealers')) {
            Schema::table('dealers', function (Blueprint $table) {
                if (! Schema::hasColumn('dealers', 'custom_domain')) {
                    $table->string('custom_domain')->nullable()->after('slug');
                }
                if (! Schema::hasColumn('dealers', 'notification_prefs')) {
                    $table->json('notification_prefs')->nullable()->after('custom_domain');
                }
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('dealers')) {
            Schema::table('dealers', function (Blueprint $table) {
                foreach (['custom_domain', 'notification_prefs'] as $col) {
                    if (Schema::hasColumn('dealers', $col)) {
                        $table->dropColumn($col);
                    }
                }
            });
        }
    }
};