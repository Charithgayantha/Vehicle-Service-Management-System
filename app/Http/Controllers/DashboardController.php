<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\JobCard;
use App\Models\Part;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today();

        $todaysBookings = JobCard::whereDate('created_at', $today)->count();

        $activeJobs = JobCard::whereIn('status', ['Pending', 'In Progress'])->count();

        $lowStockItems = Part::whereColumn('stock_quantity', '<', 'min_stock_level')
            ->take(5)
            ->get(['name as item_name', 'stock_quantity']);

        $dailyRevenue = Invoice::whereDate('created_at', $today)->sum('total_amount');

        return Inertia::render('dashboard', [
            'stats' => [
                'todaysBookings' => $todaysBookings,
                'activeJobs' => $activeJobs,
                'dailyRevenue' => (float) $dailyRevenue,
            ],
            'lowStockItems' => $lowStockItems,
        ]);
    }
}
