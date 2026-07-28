<?php

namespace Database\Seeders;

use App\Models\Part;
use App\Models\User;
use App\Models\Customer;
use App\Models\Vehicle;
use App\Models\Mechanic;
use App\Models\JobCard;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Spatie Roles
        $adminRole = Role::firstOrCreate(['name' => 'Admin']);
        $managerRole = Role::firstOrCreate(['name' => 'Service Advisor']);
        $mechanicRole = Role::firstOrCreate(['name' => 'Mechanic']);
        $customerRole = Role::firstOrCreate(['name' => 'Customer']);

        // 2. Create/Assign Charith's Admin Account
        $charith = User::firstOrCreate(
            ['email' => 'Charithgayantha3@gmail.com'],
            [
                'name' => 'Charith Gayantha',
                'password' => Hash::make('password123'),
            ]
        );
        $charith->assignRole($adminRole);

        // 3. Create Default System Admin Account
        $admin = User::firstOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name' => 'System Admin',
                'password' => Hash::make('password123'),
            ]
        );
        $admin->assignRole($adminRole);

        // 4. Create Service Advisor Account
        $advisor = User::firstOrCreate(
            ['email' => 'advisor@system.com'],
            [
                'name' => 'Service Advisor User',
                'password' => Hash::make('password123'),
            ]
        );
        $advisor->assignRole($managerRole);

        // 5. Seed Some Initial Parts Inventory
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

        // 6. Generate Dummy Data using Factories!
        // This will bring your dashboard to life
        Customer::factory(15)->create();
        Mechanic::factory(6)->create();
        Part::factory(25)->create(); 
        
        // Since VehicleFactory creates a customer, and JobCardFactory creates a Vehicle and Mechanic, 
        // calling this alone will generate a great mix of relational data.
        JobCard::factory(30)->create(); 
    }
}