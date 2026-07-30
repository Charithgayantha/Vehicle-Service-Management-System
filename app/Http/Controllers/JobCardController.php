<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\JobCard;
use App\Models\Mechanic;
use App\Models\Part; // Added Part model import
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB; // Added DB facade for transactions
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
            // Fetch parts that have stock available[cite: 4]
            'inventoryParts' => Part::where('stock_quantity', '>', 0)->get(), 
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
            // New validation for parts array[cite: 4]
            'parts_used' => 'nullable|array',
            'parts_used.*.id' => 'required|exists:parts,id',
            'parts_used.*.quantity' => 'required|integer|min:1',
            'parts_used.*.unit_price' => 'required|numeric',
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

        // Wrap in transaction so if part saving fails, the job card isn't created orphaned[cite: 4]
        DB::transaction(function () use ($validated) {
            $jobCard = JobCard::create(collect($validated)->except('parts_used')->toArray());

            if (!empty($validated['parts_used'])) {
                $partsToAttach = [];
                foreach ($validated['parts_used'] as $part) {
                    $partsToAttach[$part['id']] = [
                        'quantity' => $part['quantity'],
                        'unit_price' => $part['unit_price'],
                    ];
                }
                $jobCard->parts()->attach($partsToAttach);
            }
        });

        return redirect()->route('job-cards.index')->with('success', 'Service appointment booked successfully.');
    }

    public function show(JobCard $jobCard): Response
    {
        $this->ensureMechanicAccess($jobCard);

        return Inertia::render('JobCards/Show', [
            'jobCard' => $jobCard->load(['customer', 'vehicle', 'mechanic', 'parts']),
        ]);
    }

    public function edit(JobCard $jobCard): Response
    {
        $this->ensureMechanicAccess($jobCard);

        return Inertia::render('JobCards/Edit', [
            'jobCard' => $jobCard->load(['customer', 'vehicle', 'mechanic', 'parts']),
        ]);
    }

    public function update(Request $request, JobCard $jobCard)
    {
        $this->ensureMechanicAccess($jobCard);

        $validated = $request->validate([
            'status' => ['required', Rule::in(['Pending', 'In Progress', 'Completed', 'Cancelled'])],
        ]);

        // Transaction block to safely deduct inventory[cite: 4]
        DB::transaction(function () use ($validated, $jobCard) {
            
            // Check if status is transitioning to Completed
            if ($validated['status'] === 'Completed' && $jobCard->status !== 'Completed') {
                foreach ($jobCard->parts as $part) {
                    $quantityUsed = $part->pivot->quantity;
                    $inventoryPart = Part::find($part->id);
                    
                    // Deduct from stock_quantity column[cite: 3]
                    if ($inventoryPart && $inventoryPart->stock_quantity >= $quantityUsed) {
                        $inventoryPart->decrement('stock_quantity', $quantityUsed);
                    } else {
                        throw new \Exception("Not enough stock for {$part->name}");
                    }
                }
            }
            
            $jobCard->update($validated);
        });

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