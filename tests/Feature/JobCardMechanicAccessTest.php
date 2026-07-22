<?php

use App\Models\Customer;
use App\Models\JobCard;
use App\Models\Mechanic;
use App\Models\User;
use App\Models\Vehicle;
use Spatie\Permission\Models\Role;

test('mechanics can view and update only their assigned jobs', function () {
    $mechanicRole = Role::firstOrCreate(['name' => 'Mechanic']);

    $mechanicUser = User::factory()->create([
        'name' => 'Mechanic',
        'email' => 'mechanic.access@test.com',
    ]);
    $mechanicUser->assignRole($mechanicRole);

    $customer = Customer::create([
        'name' => 'Assigned Customer',
        'email' => 'assigned@example.com',
        'phone' => '0712345678',
        'address' => 'Test Address',
    ]);

    $vehicle = Vehicle::create([
        'customer_id' => $customer->id,
        'make' => 'Toyota',
        'model' => 'Corolla',
        'year' => 2024,
        'license_plate' => 'ABC-123',
        'vin' => 'VIN-123456',
        'color' => 'Blue',
    ]);

    $assignedMechanic = Mechanic::create([
        'name' => 'Mechanic',
        'employee_id' => 'MECH-001',
        'specialization' => 'Engine',
        'contact' => '0712345678',
    ]);

    $otherMechanic = Mechanic::create([
        'name' => 'Other Mechanic',
        'employee_id' => 'MECH-002',
        'specialization' => 'Electrical',
        'contact' => '0712345679',
    ]);

    $assignedJob = JobCard::create([
        'job_number' => 'JOB-ASSIGNED-1',
        'customer_id' => $customer->id,
        'vehicle_id' => $vehicle->id,
        'mechanic_id' => $assignedMechanic->id,
        'user_id' => $mechanicUser->id,
        'status' => 'Pending',
        'problem_description' => 'Assigned job description',
        'scheduled_at' => now()->addDay(),
    ]);

    JobCard::create([
        'job_number' => 'JOB-ASSIGNED-2',
        'customer_id' => $customer->id,
        'vehicle_id' => $vehicle->id,
        'mechanic_id' => $otherMechanic->id,
        'user_id' => $mechanicUser->id,
        'status' => 'Pending',
        'problem_description' => 'Other mechanic job',
        'scheduled_at' => now()->addDays(2),
    ]);

    $this->actingAs($mechanicUser);

    $this->get(route('job-cards.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('JobCards/Index')
            ->has('jobCards', 1)
        );

    $this->put(route('job-cards.update', $assignedJob), [
        'status' => 'In Progress',
    ])->assertRedirect(route('job-cards.index'));

    expect(JobCard::find($assignedJob->id)->status)->toBe('In Progress');
});
