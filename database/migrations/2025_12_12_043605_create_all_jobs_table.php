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
        Schema::create('all_jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('license_type');
            $table->string('job_type')->nullable();
            $table->string('schedule')->nullable();
            $table->enum('salaray_transparency', ['Yes', 'No'])->default('No');
            $table->string('salary_range')->nullable();
            $table->string('specialization')->nullable();
            $table->text('fern_notes')->nullable();
            $table->longText('description');
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('all_jobs');
    }
};
