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
        Schema::create('job_applications', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('all_job_id')
                ->constrained('all_jobs')
                ->cascadeOnDelete();

            $table->enum('status', [
                'pending',
                'shortlisted',
                'rejected',
                'hired',
            ])->default('pending');

            $table->timestamps();

            $table->unique(['user_id', 'all_job_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_applications');
    }
};
