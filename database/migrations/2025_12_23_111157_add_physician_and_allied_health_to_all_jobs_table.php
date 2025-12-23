<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('all_jobs', function (Blueprint $table) {
            $table->string('physician')->after('license_type')->nullable();
            $table->string('allied_health')->after('physician')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('all_jobs', function (Blueprint $table) {
            $table->dropColumn(['physician', 'allied_health']);
        });
    }
};
