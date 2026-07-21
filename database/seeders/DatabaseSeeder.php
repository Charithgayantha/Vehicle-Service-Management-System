<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Part;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Spatie Roles
        $adminRole = Role::firstOrCreate(['name' => 'Admin']);
        $advisorRole = Role::firstOrCreate(['name' => 'Service Advisor']);
        $mechanicRole = Role::firstOrCreate(['name' => 'Mechanic']);

        // 2. Create Admin Account
        $admin = User::firstOrCreate(
            ['email' => 'admin@system.com'],
            [
                'name' => 'System Admin',
                'password' => Hash::make('password123'),
            ]
        );
        $admin->assignRole($adminRole);

        // 3. Create Service Advisor Account
        $advisor = User::firstOrCreate(
            ['email' => 'advisor@system.com'],
            [
                'name' => 'Service Advisor User',
                'password' => Hash::make('password123'),
            ]
        );
        $advisor->assignRole($advisorRole);

        // 4. Seed Some Initial Parts Inventory
        Part::firstOrCreate(['sku' => 'OIL-SYN-01'], [
            'name' => 'Synthetic Engine Oil (4L)',
            'price' => 45.00,
            'stock_quantity' => 20,
            'min_stock_level' => 5,
        ]);

        Part::firstOrCreate(['sku' => 'FLTR-OIL-01'], [
            'name' => 'Engine Oil Filter',
            'price' => 12.50,
            'stock_quantity' => 15,
            'min_stock_level' => 3,
        ]);

        Part::firstOrCreate(['sku' => 'PAD-BRK-F'], [
            'name' => 'Front Brake Pads Set',
            'price' => 85.00,
            'stock_quantity' => 8,
            'min_stock_level' => 2,
        ]);
    }
}