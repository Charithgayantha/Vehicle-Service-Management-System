<?php

namespace Database\Factories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

class VehicleFactory extends Factory
{
    public function definition(): array
    {
        $makes = ['Toyota', 'Honda', 'Nissan', 'Ford', 'BMW', 'Mercedes-Benz', 'Audi'];
        
        return [
            // If created without a customer, it will generate one automatically
            'customer_id' => Customer::factory(), 
            'license_plate' => strtoupper(fake()->bothify('??-####')),
            'make' => fake()->randomElement($makes),
            'model' => fake()->word(),
            'year' => fake()->numberBetween(2005, 2024),
            'vin' => strtoupper(fake()->unique()->bothify('1HGCM82633A######')),
            'color' => fake()->safeColorName(),
        ];
    }
}