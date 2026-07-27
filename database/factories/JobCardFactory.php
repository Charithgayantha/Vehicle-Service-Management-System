<?php

namespace Database\Factories;

use App\Models\Vehicle;
use App\Models\Mechanic;
use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

class JobCardFactory extends Factory
{
    public function definition(): array
    {
        return [
            'job_number' => 'JC-' . fake()->unique()->numerify('######'),
            'customer_id' => Customer::factory(),
            'vehicle_id' => Vehicle::factory(),
            'mechanic_id' => Mechanic::factory(),
            'user_id' => null,
            'status' => fake()->randomElement(['Pending', 'In Progress', 'Completed', 'Cancelled']),
            'problem_description' => fake()->paragraph(),
            'ai_diagnosis' => null,
            'ai_estimated_cost' => null,
            'labor_cost' => fake()->randomFloat(2, 50, 300),
            'total_cost' => fake()->randomFloat(2, 50, 500),
            'scheduled_at' => fake()->dateTimeBetween('-1 month', '+1 month'),
            'completed_at' => null,
        ];
    }
}