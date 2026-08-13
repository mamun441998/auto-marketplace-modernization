<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // যে dealer-এর সাথে এই user যুক্ত (team member হলে)। owner-এর জন্য null.
            if (! Schema::hasColumn('users', 'dealer_id')) {
                $table->unsignedBigInteger('dealer_id')->nullable()->after('id');
            }

            // owner | manager | staff
            if (! Schema::hasColumn('users', 'role')) {
                $table->string('role')->default('owner')->after('dealer_id');
            }

            // team member invite/active status
            if (! Schema::hasColumn('users', 'member_status')) {
                $table->string('member_status')->default('active')->after('role');
            }
        });

        // FK আলাদা করে — dealers টেবিল থাকলে
        if (Schema::hasTable('dealers') && Schema::hasColumn('users', 'dealer_id')) {
            Schema::table('users', function (Blueprint $table) {
                $table->foreign('dealer_id')
                    ->references('id')->on('dealers')
                    ->nullOnDelete();
            });
        }
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'dealer_id')) {
                // FK drop (PostgreSQL: users_dealer_id_foreign)
                try {
                    $table->dropForeign(['dealer_id']);
                } catch (\Throwable $e) {
                    // ignore if not exists
                }
                $table->dropColumn('dealer_id');
            }
            if (Schema::hasColumn('users', 'role')) {
                $table->dropColumn('role');
            }
            if (Schema::hasColumn('users', 'member_status')) {
                $table->dropColumn('member_status');
            }
        });
    }
};