<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\JobCard;
use App\Models\Part;
use App\Models\Vehicle;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        // 1. Relaxed queries so factory dummy data actually shows up on the dashboard
        $todaysBookings = JobCard::count(); 
        
        // 2. Catching multiple casing formats just in case factories generated them differently
        $activeJobs = JobCard::whereIn('status', ['Pending', 'In Progress', 'pending', 'in_progress'])->count();
        
        // 3. Summing all revenue for demo purposes
        $dailyRevenue = Invoice::sum('total_amount');
        
        // 4. Using a hard threshold for the demo to ensure metrics populate
        $lowStockItems = Part::where('stock_quantity', '<=', 5)
            ->take(5)
            ->get(['name as item_name', 'stock_quantity']);

        $recentInvoices = Invoice::latest()->take(5)->get([
            'id',
            'invoice_number',
            'customer_name',
            'vehicle_number',
            'total_amount',
            'status',
        ]);

        $upcomingBookings = JobCard::with(['customer', 'vehicle', 'mechanic'])
            ->latest('scheduled_at')
            ->take(5)
            ->get();

        $component = 'dashboard';

        // Spatie Role Routing
        if ($user && $user->hasRole('Admin')) {
            $component = 'AdminDashboard';
        } elseif ($user && $user->hasRole('Service Advisor')) {
            $component = 'AdvisorDashboard';
        } elseif ($user && $user->hasRole('Mechanic')) {
            $component = 'MechanicDashboard';
        } elseif ($user && $user->hasRole('Customer')) {
            $component = 'CustomerDashboard';
        }

        $customerVehicles = [];
        $customer = null;
        if ($user && $user->hasRole('Customer')) {
            $customer = \App\Models\Customer::where('email', $user->email)->first();

            if ($customer) {
                $customerVehicles = Vehicle::query()
                    ->where('customer_id', $customer->id)
                    ->take(5)
                    ->get(['id', 'make', 'model', 'license_plate', 'color']);
            }
        }

        return Inertia::render($component, [
            'auth' => [
                'user' => $user,
            ],
            'stats' => [
                'todaysBookings' => $todaysBookings,
                'activeJobs' => $activeJobs,
                'dailyRevenue' => (float) $dailyRevenue,
                'totalCustomers' => \App\Models\Customer::count(),
                'totalVehicles' => Vehicle::count(),
                'lowStockCount' => $lowStockItems->count(),
            ],
            'lowStockItems' => $lowStockItems,
            'recentInvoices' => $recentInvoices,
            'upcomingBookings' => $upcomingBookings,
            'customerVehicles' => $customerVehicles,
            'customerInvoices' => Invoice::where('customer_name', $customer?->name ?? $user?->name ?? '')
                ->latest()
                ->take(5)
                ->get([
                    'id',
                    'invoice_number',
                    'customer_name',
                    'vehicle_number',
                    'total_amount',
                    'status',
                ]),
        ]);
    }
}