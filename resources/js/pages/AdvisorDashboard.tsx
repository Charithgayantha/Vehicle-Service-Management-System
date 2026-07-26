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
    upcomingBookings: Array<{
        id: number;
        job_number?: string;
        scheduled_at?: string;
        status: string;
        customer?: { name: string };
        vehicle?: { make: string; model: string; registration_number: string };
        mechanic?: { name: string };
    }>;
}

export default function AdvisorDashboard({ stats, upcomingBookings }: DashboardProps) {
    return (
        <AppLayout>
            <Head title="Advisor Dashboard" />

            <div className="w-full space-y-6 px-6 py-8 lg:px-10 text-gray-900 dark:text-zinc-100">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Manager Dashboard</h1>
                        <p className="text-sm text-gray-500 dark:text-zinc-400">Create jobs, manage customers, and schedule repairs.</p>
                    </div>
                    <Link href="/job-cards/create" className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition">
                        New Booking
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div style={{ borderLeftWidth: '5px', borderLeftColor: '#3b82f6' }} className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-lg">
                        <div className="text-sm text-gray-500 dark:text-zinc-400">Today's Bookings</div>
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

                <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-lg">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Upcoming Bookings</h2>
                    <div className="space-y-3">
                        {upcomingBookings.length > 0 ? (
                            upcomingBookings.map((booking) => (
                                <div key={booking.id} className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 p-4 text-sm">
                                    <div>
                                        <div className="font-semibold text-gray-900 dark:text-white">{booking.job_number || `#${booking.id}`}</div>
                                        <div className="text-gray-500 dark:text-zinc-400">{booking.customer?.name} • {booking.vehicle?.make} {booking.vehicle?.model}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium text-gray-900 dark:text-white">{booking.scheduled_at}</div>
                                        <div className="text-gray-500 dark:text-zinc-400 text-xs">{booking.status}</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 dark:text-zinc-400">No upcoming bookings yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}