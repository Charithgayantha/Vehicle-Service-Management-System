<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require __DIR__ . '/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\User;
use App\Models\Customer;

$email = 'customer@gmail.com';

$user = User::where('email', $email)->first();
$customer = Customer::where('email', $email)->first();

if ($user) {
    echo "User found: id={$user->id}, name={$user->name}, email={$user->email}\n";
} else {
    echo "User not found for {$email}\n";
}

if ($customer) {
    echo "Customer found: id={$customer->id}, name={$customer->name}, email={$customer->email}\n";
} else {
    echo "Customer not found for {$email}\n";
}
