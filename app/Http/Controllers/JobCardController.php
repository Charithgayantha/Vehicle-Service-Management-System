<?php

namespace App\Http\Controllers;

use App\Models\JobCard;
use App\Models\Customer;
use App\Models\Vehicle;
use App\Models\Mechanic;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class JobCardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('JobCards/Index', [
            'jobCards' => JobCard::with(['customer', 'vehicle', 'mechanic'])->latest()->get()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('JobCards/Create', [
            'customers' => Customer::all(),
            'vehicles' => Vehicle::all(),
            'mechanics' => Mechanic::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'vehicle_id' => 'required|exists:vehicles,id',
            'mechanic_id' => 'required|exists:mechanics,id',
            'scheduled_at' => 'required|date',
            'status' => 'required|in:Pending,In Progress,Completed,Cancelled',
            'problem_description' => 'required|string',
        ]);

        // Auto-generate job number to satisfy your table schema requirement
        $validated['job_number'] = 'JOB-' . strtoupper(uniqid());

        // Prevent Double Booking for the same mechanic at the exact same scheduled time slot
        $existingBooking = JobCard::where('mechanic_id', $validated['mechanic_id'])
            ->where('scheduled_at', $validated['scheduled_at'])
            ->where('status', '!=', 'Cancelled')
            ->exists();

        if ($existingBooking) {
            return back()->withErrors(['scheduled_at' => 'This mechanic is already booked for this exact date and time. Please choose another slot.']);
        }

        JobCard::create($validated);

        return redirect()->route('job-cards.index')->with('success', 'Service appointment booked successfully.');
    }
}