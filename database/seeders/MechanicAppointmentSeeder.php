<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\JobCard;
use App\Models\Mechanic;
use App\Models\Vehicle;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MechanicAppointmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $email = 'mechanic@gmail.com';

        // Try to find a User with that email and map to a Mechanic by name
        $user = User::where('email', $email)->first();

        $mechanic = null;

        if ($user) {
            $mechanic = Mechanic::where('name', $user->name)->first();
        }

        // If not found via User, try mechanic.contact
        if (! $mechanic) {
            $mechanic = Mechanic::where('contact', $email)->first();
        }

        // Fallback: use the first mechanic or create one
        if (! $mechanic) {
            $mechanic = Mechanic::first();
            if (! $mechanic) {
                $mechanic = Mechanic::factory()->create(['contact' => $email]);
            }
        }

        // Create a generated customer and vehicle for the appointment
        $customer = Customer::factory()->create([
            'name' => 'Generated Customer',
            'email' => 'generated.customer@example.com',
            'phone' => '000-000-0000',
            'address' => 'Generated Address',
        ]);

        $vehicle = Vehicle::factory()->create([
            'customer_id' => $customer->id,
            'make' => 'Toyota',
            'model' => 'Corolla',
            'year' => 2018,
            'license_plate' => 'GEN-123',
            'vin' => 'VIN'.strtoupper(uniqid()),
            'color' => 'White',
        ]);

        $scheduledAt = now()->addDays(3)->setTime(10, 0);

        $job = JobCard::create([
            'customer_id' => $customer->id,
            'vehicle_id' => $vehicle->id,
            'mechanic_id' => $mechanic->id,
            'job_number' => 'JOB-'.strtoupper(uniqid()),
            'scheduled_at' => $scheduledAt,
            'status' => 'Pending',
            'problem_description' => 'Routine maintenance: oil change and inspection.',
        ]);

        $this->command->info("Created JobCard id={$job->id} scheduled_at={$scheduledAt} assigned_to_mechanic_id={$mechanic->id}");
    }
}
