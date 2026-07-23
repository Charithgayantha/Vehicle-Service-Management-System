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
    Schema::create('parts', function (Blueprint $table) {
        $table->id();
        $table->string('sku')->unique(); // Add this line
        $table->string('name');
        $table->decimal('price', 10, 2);
        $table->integer('stock_quantity');
        $table->integer('min_stock_level')->default(5); // Add this line
        $table->timestamps();
    });
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parts');
    }
};
