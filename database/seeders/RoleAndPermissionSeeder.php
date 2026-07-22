<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RoleAndPermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Create roles
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $managerRole = Role::firstOrCreate(['name' => 'manager']);
        Role::firstOrCreate(['name' => 'mechanic']);
        Role::firstOrCreate(['name' => 'customer']);

        // Find your user account (e.g., Charith Gayantha) by email and assign the admin role
        $user = User::where('email', 'Charithgayantha3@gmail.com')->first();

        if ($user) {
            $user->assignRole($adminRole);
        }
    }
}
