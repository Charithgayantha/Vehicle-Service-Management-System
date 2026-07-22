<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function index()
    {
        $invoices = Invoice::latest()->paginate(10);
        return Inertia::render('Invoices/Index', [
            'invoices' => $invoices
        ]);
    }

    public function create()
    {
        return Inertia::render('Invoices/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'vehicle_number' => 'required|string|max:255',
            'service_fee' => 'required|numeric|min:0',
            'parts_total' => 'required|numeric|min:0',
            'status' => 'required|string|in:pending,paid,cancelled',
        ]);

        $invoiceNumber = 'INV-' . strtoupper(uniqid());
        $totalAmount = $validated['service_fee'] + $validated['parts_total'];

        Invoice::create([
            'invoice_number' => $invoiceNumber,
            'customer_name' => $validated['customer_name'],
            'vehicle_number' => $validated['vehicle_number'],
            'service_fee' => $validated['service_fee'],
            'parts_total' => $validated['parts_total'],
            'total_amount' => $totalAmount,
            'status' => $validated['status'],
        ]);

        return redirect()->route('invoices.index')->with('success', 'Invoice generated successfully.');
    }

    public function show(Invoice $invoice)
    {
        return Inertia::render('Invoices/Show', [
            'invoice' => $invoice
        ]);
    }

    public function destroy(Invoice $invoice)
    {
        $invoice->delete();
        return redirect()->route('invoices.index')->with('success', 'Invoice deleted successfully.');
    }
}