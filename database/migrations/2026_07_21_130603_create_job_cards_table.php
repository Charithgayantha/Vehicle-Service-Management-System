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
    Schema::create('job_cards', function (Blueprint $table) {
        $table->id();
        $table->string('job_number')->unique();
        $table->foreignId('customer_id')->constrained()->cascadeOnDelete();
        $table->foreignId('vehicle_id')->constrained()->cascadeOnDelete();
        $table->foreignId('mechanic_id')->nullable()->constrained()->nullOnDelete();
        $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
        $table->string('status')->default('Pending');
        $table->text('problem_description');
        $table->text('ai_diagnosis')->nullable();
        $table->decimal('ai_estimated_cost', 10, 2)->nullable();
        $table->decimal('labor_cost', 10, 2)->default(0.00);
        $table->decimal('total_cost', 10, 2)->default(0.00);
        $table->dateTime('scheduled_at')->nullable();
        $table->dateTime('completed_at')->nullable();
        $table->timestamps();
    });
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_cards');
    }
};
