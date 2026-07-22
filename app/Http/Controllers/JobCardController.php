<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\JobCard;
use App\Models\Mechanic;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class JobCardController extends Controller
{
    public function index(): Response
    {
        $query = JobCard::with(['customer', 'vehicle', 'mechanic'])->latest();

        /** @var User|null $user */
        $user = auth()->user();

        if ($user && $user->hasRole('Mechanic')) {
            $query->whereHas('mechanic', function ($query) use ($user) {
                $query->where('name', $user->name);
            });
        }

        return Inertia::render('JobCards/Index', [
            'jobCards' => $query->get(),
        ]);
    }

    public function create(): Response
    {
        $this->ensureManageAccess();

        return Inertia::render('JobCards/Create', [
            'customers' => Customer::all(),
            'vehicles' => Vehicle::all(),
            'mechanics' => Mechanic::all(),
        ]);
    }

    public function store(Request $request)
    {
        $this->ensureManageAccess();

        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'vehicle_id' => 'required|exists:vehicles,id',
            'mechanic_id' => 'required|exists:mechanics,id',
            'scheduled_at' => 'required|date',
            'status' => 'required|in:Pending,In Progress,Completed,Cancelled',
            'problem_description' => 'required|string',
        ]);

        $validated['job_number'] = 'JOB-'.strtoupper(uniqid());

        $existingBooking = JobCard::where('mechanic_id', $validated['mechanic_id'])
            ->where('scheduled_at', $validated['scheduled_at'])
            ->where('status', '!=', 'Cancelled')
            ->exists();

        if ($existingBooking) {
            return back()->withErrors([
                'scheduled_at' => 'This mechanic is already booked for this exact date and time. Please choose another slot.',
            ]);
        }

        JobCard::create($validated);

        return redirect()->route('job-cards.index')->with('success', 'Service appointment booked successfully.');
    }

    public function show(JobCard $jobCard): Response
    {
        $this->ensureMechanicAccess($jobCard);

        return Inertia::render('JobCards/Show', [
            'jobCard' => $jobCard->load(['customer', 'vehicle', 'mechanic']),
        ]);
    }

    public function edit(JobCard $jobCard): Response
    {
        $this->ensureMechanicAccess($jobCard);

        return Inertia::render('JobCards/Edit', [
            'jobCard' => $jobCard->load(['customer', 'vehicle', 'mechanic']),
        ]);
    }

    public function update(Request $request, JobCard $jobCard)
    {
        $this->ensureMechanicAccess($jobCard);

        $validated = $request->validate([
            'status' => ['required', Rule::in(['Pending', 'In Progress', 'Completed', 'Cancelled'])],
        ]);

        $jobCard->update($validated);

        return redirect()->route('job-cards.index')->with('success', 'Assigned job updated successfully.');
    }

    private function ensureMechanicAccess(JobCard $jobCard): void
    {
        /** @var User|null $user */
        $user = auth()->user();

        if ($user && ($user->hasRole('Admin') || $user->hasRole('Service Advisor'))) {
            return;
        }

        abort_unless(
            $user && $user->hasRole('Mechanic') && $jobCard->mechanic?->name === $user->name,
            403,
            'You can only view or update jobs assigned to you.'
        );
    }

    private function ensureManageAccess(): void
    {
        /** @var User|null $user */
        $user = auth()->user();

        abort_unless(
            $user && ($user->hasRole('Admin') || $user->hasRole('Service Advisor')),
            403,
            'Only admins and service advisors can create or assign job cards.'
        );
    }
}
