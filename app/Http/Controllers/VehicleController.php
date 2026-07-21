<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Vehicle;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VehicleController extends Controller
{
    /**
     * Display a listing of the vehicles.
     */
    public function index(): Response
    {
        // Eager load the customer relationship and order by newest first
        $vehicles = Vehicle::with('customer')->latest()->get();

        return Inertia::render('Vehicles/Index', [
            'vehicles' => $vehicles,
        ]);
    }

    /**
     * Show the form for creating a new vehicle.
     */
    public function create(): Response
    {
        // Fetch customers for the dropdown menu
        $customers = Customer::select('id', 'name', 'phone')->orderBy('name')->get();

        return Inertia::render('Vehicles/Create', [
            'customers' => $customers,
        ]);
    }

    /**
     * Store a newly created vehicle in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'make' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'license_plate' => 'required|string|max:50|unique:vehicles,license_plate',
            'vin' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:100',
        ]);

        Vehicle::create($validated);

        return redirect()->route('vehicles.index')->with('success', 'Vehicle registered successfully.');
    }

    /**
     * Display the specified vehicle.
     */
    public function show(Vehicle $vehicle): Response
    {
        return Inertia::render('Vehicles/Show', [
            'vehicle' => $vehicle->load('customer'),
        ]);
    }

    /**
     * Show the form for editing the specified vehicle.
     */
    public function edit(Vehicle $vehicle): Response
    {
        $customers = Customer::select('id', 'name', 'phone')->orderBy('name')->get();

        return Inertia::render('Vehicles/Edit', [
            'vehicle' => $vehicle,
            'customers' => $customers,
        ]);
    }

    /**
     * Update the specified vehicle in storage.
     */
    public function update(Request $request, Vehicle $vehicle): RedirectResponse
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'make' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            // Ignore the current vehicle's ID when checking for unique license plates
            'license_plate' => 'required|string|max:50|unique:vehicles,license_plate,' . $vehicle->id,
            'vin' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:100',
        ]);

        $vehicle->update($validated);

        return redirect()->route('vehicles.index')->with('success', 'Vehicle updated successfully.');
    }

    /**
     * Remove the specified vehicle from storage.
     */
    public function destroy(Vehicle $vehicle): RedirectResponse
    {
        $vehicle->delete();

        return redirect()->route('vehicles.index')->with('success', 'Vehicle deleted successfully.');
    }
}