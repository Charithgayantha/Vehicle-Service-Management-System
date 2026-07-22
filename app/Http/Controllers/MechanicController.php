<?php

namespace App\Http\Controllers;

use App\Models\Mechanic;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MechanicController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Mechanics/Index', [
            'mechanics' => Mechanic::all()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Mechanics/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'employee_id' => 'required|string|max:50|unique:mechanics,employee_id',
            'specialization' => 'required|string|max:255',
            'contact' => 'required|string|max:50',
        ]);

        Mechanic::create($validated);

        return redirect()->route('mechanics.index')->with('success', 'Mechanic added successfully.');
    }

    public function edit(Mechanic $mechanic): Response
    {
        return Inertia::render('Mechanics/Edit', [
            'mechanic' => $mechanic
        ]);
    }

    public function update(Request $request, Mechanic $mechanic)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'employee_id' => 'required|string|max:50|unique:mechanics,employee_id,' . $mechanic->id,
            'specialization' => 'required|string|max:255',
            'contact' => 'required|string|max:50',
        ]);

        $mechanic->update($validated);

        return redirect()->route('mechanics.index')->with('success', 'Mechanic updated successfully.');
    }

    public function destroy(Mechanic $mechanic)
    {
        $mechanic->delete();

        return redirect()->route('mechanics.index')->with('success', 'Mechanic deleted successfully.');
    }
}