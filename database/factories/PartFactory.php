<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PartFactory extends Factory
{
    public function definition(): array
    {
        $parts = ['Oil Filter', 'Brake Pads', 'Spark Plug', 'Air Filter', 'Cabin Filter', 'Wiper Blades', 'Battery', 'Alternator', 'Timing Belt'];

        return [
            'name' => fake()->randomElement($parts),
            'sku' => 'PRT-' . strtoupper(fake()->unique()->bothify('???-####')),
            'price' => fake()->randomFloat(2, 10, 500), // Prices between 10.00 and 500.00
            'stock_quantity' => fake()->numberBetween(0, 100), // Some will trigger the <= 5 low stock alert
        ];
    }
}