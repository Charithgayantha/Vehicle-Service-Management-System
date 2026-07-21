<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of the customers.
     */
   public function index()
{
    // 1. Fetch all customers from the database, newest first
    $customers = \App\Models\Customer::latest()->get();

    // 2. Pass the fetched customers to your Inertia React component
    return inertia('Customers/Index', [
        'customers' => $customers
    ]);
}

    /**
     * Show the form for creating a new customer.
     */
    public function create()
    {
        return Inertia::render('Customers/Create');
    }

    /**
     * Store a newly created customer in database.
     */
    public function store(Request $request)
{
    // 1. Validate the incoming form data
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:customers,email',
        'phone' => 'required|string|max:20',
        'address' => 'nullable|string|max:500',
    ]);

    // 2. Create the record in the database
    \App\Models\Customer::create($validated);

    // 3. MUST return a redirect for Inertia to navigate back!
    return redirect()->route('customers.index');
}

    /**
     * Display the specified customer and their vehicles.
     */
    public function show(Customer $customer)
    {
        $customer->load('vehicles');
        return Inertia::render('Customers/Show', [
            'customer' => $customer
        ]);
    }

    /**
     * Show the form for editing the customer.
     */
    public function edit(Customer $customer)
    {
        return Inertia::render('Customers/Edit', [
            'customer' => $customer
        ]);
    }

    /**
     * Update the customer in database.
     */
    public function update(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'nullable|string|max:500',
        ]);

        $customer->update($validated);

        return redirect()->route('customers.index')->with('success', 'Customer updated successfully.');
    }

    /**
     * Remove the customer from database.
     */
    public function destroy(Customer $customer)
    {
        $customer->delete();

        return redirect()->route('customers.index')->with('success', 'Customer deleted successfully.');
    }
}