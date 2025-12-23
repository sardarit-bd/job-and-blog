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
        Schema::create('all_job_industry', function (Blueprint $table) {
            $table->id();
            $table->foreignId('all_job_id')->constrained('all_jobs')->onDelete('cascade');
            $table->foreignId('industry_id')->constrained('industries')->onDelete('cascade');

            $table->unique(['all_job_id', 'industry_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('all_job_industry');
    }
};
