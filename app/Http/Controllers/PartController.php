<?php

namespace App\Http\Controllers;

use App\Models\Part;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PartController extends Controller
{
    public function index()
    {
        $parts = Part::latest()->paginate(10);
        return Inertia::render('Parts/Index', [
            'parts' => $parts
        ]);
    }

    public function create()
    {
        return Inertia::render('Parts/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'required|string|max:255|unique:parts',
            'stock_quantity' => 'required|integer|min:0',
            'unit_price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ]);

        Part::create([
            'name' => $validated['name'],
            'sku' => $validated['sku'],
            'stock_quantity' => $validated['stock_quantity'],
            'price' => $validated['unit_price'],
            'description' => $validated['description'] ?? null,
        ]);

        return redirect()->route('parts.index')->with('success', 'Part added successfully.');
    }

    public function edit(Part $part)
    {
        return Inertia::render('Parts/Edit', [
            'part' => $part
        ]);
    }

    public function update(Request $request, Part $part)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'required|string|max:255|unique:parts,sku,' . $part->id,
            'stock_quantity' => 'required|integer|min:0',
            'unit_price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ]);

        $part->update([
            'name' => $validated['name'],
            'sku' => $validated['sku'],
            'stock_quantity' => $validated['stock_quantity'],
            'price' => $validated['unit_price'],
            'description' => $validated['description'] ?? null,
        ]);

        return redirect()->route('parts.index')->with('success', 'Part updated successfully.');
    }

    public function destroy(Part $part)
    {
        $part->delete();
        return redirect()->route('parts.index')->with('success', 'Part deleted successfully.');
    }
}