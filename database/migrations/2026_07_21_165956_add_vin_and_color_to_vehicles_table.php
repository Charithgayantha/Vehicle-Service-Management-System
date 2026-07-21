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
        Schema::table('vehicles', function (Blueprint $table) {
            if (! Schema::hasColumn('vehicles', 'vin')) {
                $table->string('vin')->nullable()->after('license_plate');
            }

            if (! Schema::hasColumn('vehicles', 'color')) {
                $table->string('color')->nullable()->after('vin');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vehicles', function (Blueprint $table) {
            if (Schema::hasColumn('vehicles', 'vin')) {
                $table->dropColumn('vin');
            }

            if (Schema::hasColumn('vehicles', 'color')) {
                $table->dropColumn('color');
            }
        });
    }
};
