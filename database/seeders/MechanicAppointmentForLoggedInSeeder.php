<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\JobCard;
use App\Models\Mechanic;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Database\Seeder;

class MechanicAppointmentForLoggedInSeeder extends Seeder
{
    public function run(): void
    {
        // Find a user that likely represents the mechanic logged in (email contains 'mechanic')
        $user = User::where('email', 'like', '%mechanic%')->first();

        if (! $user) {
            $this->command->info('No user with email containing "mechanic" found. Skipping.');
            return;
        }

        // Ensure there's a Mechanic record matching the user's name
        $mechanic = Mechanic::firstOrCreate([
            'name' => $user->name,
        ], [
            'employee_id' => 'EMP-' . rand(1000, 9999),
            'specialization' => 'General Maintenance',
            'contact' => $user->email,
        ]);

        $customer = Customer::factory()->create([
            'name' => 'Auto Generated Customer for ' . $user->name,
            'email' => 'auto.' . uniqid() . '@example.com',
        ]);

        $vehicle = Vehicle::factory()->create([
            'customer_id' => $customer->id,
            'make' => 'Honda',
            'model' => 'Civic',
            'year' => 2020,
        ]);

        $scheduledAt = now()->addDays(1)->setTime(9, 30);

        $job = JobCard::create([
            'customer_id' => $customer->id,
            'vehicle_id' => $vehicle->id,
            'mechanic_id' => $mechanic->id,
            'job_number' => 'JOB-'.strtoupper(uniqid()),
            'scheduled_at' => $scheduledAt,
            'status' => 'Pending',
            'problem_description' => 'Generated appointment to verify visibility for logged-in mechanic.',
        ]);

        $this->command->info("Created JobCard id={$job->id} for mechanic name={$mechanic->name} (user email={$user->email})");
    }
}
