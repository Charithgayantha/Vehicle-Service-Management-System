<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\JobCardController;
use App\Http\Controllers\MechanicController;
use App\Http\Controllers\PartController;
use App\Http\Controllers\VehicleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    // Vehicle Service Management Routes
    Route::resource('customers', CustomerController::class);
    Route::resource('vehicles', VehicleController::class);
    Route::resource('mechanics', MechanicController::class);
    Route::resource('parts', PartController::class);
    Route::resource('job-cards', JobCardController::class);
    Route::resource('invoices', InvoiceController::class);
});

require __DIR__.'/settings.php';
