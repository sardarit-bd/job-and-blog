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
        Schema::create('job_licensed_ins', function (Blueprint $table) {
            $table->id();
            $table->foreignId('all_job_id')->constrained()->onDelete('cascade');
            $table->foreignId('licensed_in_id')->constrained()->onDelete('cascade');
            $table->timestamps();

            $table->unique(['all_job_id', 'licensed_in_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_licensed_ins');
    }
};
