<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MechanicFactory extends Factory
{
    public function definition(): array
    {
        $specializations = ['Engine Repair', 'Electrical', 'Transmission', 'Suspension & Steering', 'General Maintenance'];

        return [
            'name' => fake()->name(),
            'employee_id' => 'EMP-' . fake()->unique()->numberBetween(1000, 9999),
            'specialization' => fake()->randomElement($specializations),
            'contact' => fake()->phoneNumber(),
        ];
    }
}