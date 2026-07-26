<?php

use App\Http\Controllers\AiServiceSummaryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\JobCardController;
use App\Http\Controllers\MechanicController;
use App\Http\Controllers\PartController;
use App\Http\Controllers\VehicleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\RegisteredUserController;

// Fixed registration routes using the Route facade
Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
Route::post('/register', [RegisteredUserController::class, 'store']);

// Home route - updated to load your custom welcome.blade.php view
Route::get('/', function () {
    return view('welcome');
})->name('home');

// Authenticated Routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    // AI Service Summary Page & API Endpoint
    Route::get('/AiServiceSummary', function () {
        return Inertia::render('AiServiceSummary');
    })->name('ai.service.summary');

    Route::post('/api/generate-summary', [AiServiceSummaryController::class, 'generate']);

    // 1. Routes accessible by Staff AND Customers (Customers only see their own records via controller scoping)
    Route::middleware(['role:Admin|Service Advisor|Mechanic|Customer'])->group(function () {
        Route::resource('customers', CustomerController::class);
        Route::resource('vehicles', VehicleController::class);
        Route::resource('job-cards', JobCardController::class);
        Route::resource('invoices', InvoiceController::class);
    });

    // 2. Strict Staff-Only Routes (Blocked for Customers - prevents access to parts and mechanics)
    Route::middleware(['role:Admin|Service Advisor|Mechanic'])->group(function () {
        Route::resource('mechanics', MechanicController::class);
        Route::resource('parts', PartController::class);
    });
});

require __DIR__.'/settings.php';