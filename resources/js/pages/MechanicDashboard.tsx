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

            <div className="w-full space-y-6 px-6 py-8 lg:px-10 text-gray-900 dark:text-zinc-100">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Mechanic Dashboard</h1>
                        <p className="text-sm text-gray-500 dark:text-zinc-400">Your active repair tasks and needed parts.</p>
                    </div>
                    <Link href="/job-cards" className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition">
                        Open Assigned Jobs
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div style={{ borderLeftWidth: '5px', borderLeftColor: '#3b82f6' }} className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-lg">
                        <div className="text-sm text-gray-500 dark:text-zinc-400">Today&apos;s Bookings</div>
                        <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{stats.todaysBookings}</div>
                    </div>
                    <div style={{ borderLeftWidth: '5px', borderLeftColor: '#eab308' }} className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-lg">
                        <div className="text-sm text-gray-500 dark:text-zinc-400">Active Jobs</div>
                        <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{stats.activeJobs}</div>
                    </div>
                    <div style={{ borderLeftWidth: '5px', borderLeftColor: '#22c55e' }} className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-lg">
                        <div className="text-sm text-gray-500 dark:text-zinc-400">Daily Revenue</div>
                        <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Rs. {stats.dailyRevenue.toFixed(2)}</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-lg">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Active Repair Tasks</h2>
                        <div className="space-y-3">
                            {upcomingBookings.length > 0 ? (
                                upcomingBookings.map((job) => (
                                    <div key={job.id} className="rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 p-4 text-sm">
                                        <div className="font-semibold text-gray-900 dark:text-white">{job.job_number || `#${job.id}`}</div>
                                        <div className="text-gray-500 dark:text-zinc-400">{job.customer?.name} • {job.vehicle?.make} {job.vehicle?.model}</div>
                                        <div className="mt-1 text-indigo-600 dark:text-indigo-400 font-medium">Status: {job.status}</div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-zinc-400">No active repair tasks assigned.</p>
                            )}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-lg">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Part Requests</h2>
                        <div className="space-y-3">
                            {lowStockItems.length > 0 ? (
                                lowStockItems.map((item, index) => (
                                    <div key={`${item.item_name}-${index}`} className="flex items-center justify-between rounded-xl border border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/10 px-4 py-3 text-sm text-amber-800 dark:text-amber-300">
                                        <span className="font-medium">{item.item_name}</span>
                                        <span className="font-bold text-amber-600 dark:text-amber-400">{item.stock_quantity} left</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-zinc-400">No parts need attention.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}