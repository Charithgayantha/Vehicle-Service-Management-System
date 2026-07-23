import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { Auth } from '@/types';

interface DashboardProps {
    auth: Auth;
    stats: {
        todaysBookings: number;
        activeJobs: number;
        dailyRevenue: number;
    };
    lowStockItems: Array<{
        item_name: string;
        stock_quantity: number;
    }>;
    upcomingBookings: Array<{
        id: number;
        job_number?: string;
        status: string;
        customer?: { name: string };
        vehicle?: { make: string; model: string; registration_number: string };
        mechanic?: { name: string };
    }>;
}

export default function MechanicDashboard({ stats, lowStockItems, upcomingBookings }: DashboardProps) {
    return (
        <AppLayout>
            <Head title="Mechanic Dashboard" />

            <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Mechanic Dashboard</h1>
                        <p className="text-sm text-gray-500">Your active repair tasks and needed parts.</p>
                    </div>
                    <Link href="/job-cards" className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                        Open Assigned Jobs
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-lg border-l-4 border-blue-500 bg-white p-4 shadow-sm">
                        <div className="text-sm text-gray-500">Today&apos;s Bookings</div>
                        <div className="mt-1 text-2xl font-semibold">{stats.todaysBookings}</div>
                    </div>
                    <div className="rounded-lg border-l-4 border-yellow-500 bg-white p-4 shadow-sm">
                        <div className="text-sm text-gray-500">Active Jobs</div>
                        <div className="mt-1 text-2xl font-semibold">{stats.activeJobs}</div>
                    </div>
                    <div className="rounded-lg border-l-4 border-green-500 bg-white p-4 shadow-sm">
                        <div className="text-sm text-gray-500">Daily Revenue</div>
                        <div className="mt-1 text-2xl font-semibold">Rs. {stats.dailyRevenue.toFixed(2)}</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900">Active Repair Tasks</h2>
                        <div className="space-y-3">
                            {upcomingBookings.length > 0 ? (
                                upcomingBookings.map((job) => (
                                    <div key={job.id} className="rounded border p-3 text-sm">
                                        <div className="font-semibold">{job.job_number || `#${job.id}`}</div>
                                        <div className="text-gray-500">{job.customer?.name} • {job.vehicle?.make} {job.vehicle?.model}</div>
                                        <div className="mt-1 text-gray-600">Status: {job.status}</div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">No active repair tasks assigned.</p>
                            )}
                        </div>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900">Part Requests</h2>
                        <div className="space-y-2">
                            {lowStockItems.length > 0 ? (
                                lowStockItems.map((item, index) => (
                                    <div key={`${item.item_name}-${index}`} className="flex items-center justify-between rounded bg-yellow-50 px-3 py-2 text-sm">
                                        <span>{item.item_name}</span>
                                        <span className="font-semibold text-yellow-700">{item.stock_quantity} left</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">No parts need attention.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
