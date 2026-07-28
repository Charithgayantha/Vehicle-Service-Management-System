<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Invoice;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Database\Seeder;

class CustomerVehicleInvoiceSeeder extends Seeder
{
    public function run(): void
    {
        $email = 'customer@gmail.com';

        // Try find a User first (for name)
        $user = User::where('email', $email)->first();

        $name = $user?->name ?? 'Generated Customer';

        // Ensure a Customer record exists
        $customer = Customer::firstOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'phone' => '000-111-2222',
                'address' => 'Generated Address',
            ]
        );

        // Create a vehicle for this customer
        $vehicle = Vehicle::factory()->create([
            'customer_id' => $customer->id,
            'make' => 'Ford',
            'model' => 'Focus',
            'year' => 2017,
            'license_plate' => 'CUST-'.strtoupper(uniqid()),
            'vin' => 'VIN'.strtoupper(uniqid()),
            'color' => 'Black',
        ]);

        // Create a past invoice for this customer
        $invoiceNumber = 'INV-' . now()->format('Ymd') . '-' . strtoupper(uniqid());

        $invoice = Invoice::create([
            'invoice_number' => $invoiceNumber,
            'customer_name' => $customer->name,
            'vehicle_number' => $vehicle->license_plate,
            'service_fee' => 120.00,
            'parts_total' => 45.50,
            'total_amount' => 165.50,
            'status' => 'paid',
            'created_at' => now()->subDays(7),
            'updated_at' => now()->subDays(7),
        ]);

        $this->command->info("Created vehicle id={$vehicle->id} and invoice id={$invoice->id} for {$email}");
    }
}
