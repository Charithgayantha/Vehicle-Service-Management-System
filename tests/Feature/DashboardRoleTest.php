<?php

use App\Models\Customer;
use App\Models\User;
use App\Models\Vehicle;
use Spatie\Permission\Models\Role;

test('admin users get the admin dashboard component', function () {
    $adminRole = Role::firstOrCreate(['name' => 'Admin']);
    $user = User::factory()->create();
    $user->assignRole($adminRole);

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('AdminDashboard'));
});

test('service advisor users get the advisor dashboard component', function () {
    $advisorRole = Role::firstOrCreate(['name' => 'Service Advisor']);
    $user = User::factory()->create();
    $user->assignRole($advisorRole);

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('AdvisorDashboard'));
});

test('mechanic users get the mechanic dashboard component', function () {
    $mechanicRole = Role::firstOrCreate(['name' => 'Mechanic']);
    $user = User::factory()->create();
    $user->assignRole($mechanicRole);

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('MechanicDashboard'));
});

test('customer users get the customer dashboard component', function () {
    $customerRole = Role::firstOrCreate(['name' => 'Customer']);
    $user = User::factory()->create();
    $user->assignRole($customerRole);

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('CustomerDashboard'));
});