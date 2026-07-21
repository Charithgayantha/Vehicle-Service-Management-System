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
        if (! Schema::hasTable('vehicles')) {
            Schema::create('vehicles', function (Blueprint $table) {
                $table->id();
                $table->foreignId('customer_id')->constrained()->onDelete('cascade');
                $table->string('make');
                $table->string('model');
                $table->integer('year');
                $table->string('license_plate')->unique();
                $table->string('vin')->nullable();
                $table->string('color')->nullable();
                $table->timestamps();
            });
        }

        Schema::table('vehicles', function (Blueprint $table) {
            if (! Schema::hasColumn('vehicles', 'vin')) {
                $table->string('vin')->nullable();
            }

            if (! Schema::hasColumn('vehicles', 'color')) {
                $table->string('color')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
