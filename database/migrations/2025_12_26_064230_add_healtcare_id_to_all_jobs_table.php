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
            $table->foreignId('healthcare_id')->nullable()->constrained()->onDelete('cascade')->after('license_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('all_jobs', function (Blueprint $table) {
            $table->dropForeign(['healthcare_id']);
            $table->dropColumn('healthcare_id');
        });
    }
};
