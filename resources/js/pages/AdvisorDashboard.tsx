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

            <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8 text-zinc-100">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold text-white">Manager Dashboard</h1>
                        <p className="text-sm text-zinc-400">Create jobs, manage customers, and schedule repairs.</p>
                    </div>
                    <Link href="/job-cards/create" className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition">
                        New Booking
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-xl border border-zinc-800 border-l-4 border-l-blue-500 bg-zinc-900 p-5 shadow-lg">
                        <div className="text-sm text-zinc-400">Today&apos;s Bookings</div>
                        <div className="mt-1 text-2xl font-bold text-white">{stats.todaysBookings}</div>
                    </div>
                    <div className="rounded-xl border border-zinc-800 border-l-4 border-l-yellow-500 bg-zinc-900 p-5 shadow-lg">
                        <div className="text-sm text-zinc-400">Active Jobs</div>
                        <div className="mt-1 text-2xl font-bold text-white">{stats.activeJobs}</div>
                    </div>
                    <div className="rounded-xl border border-zinc-800 border-l-4 border-l-green-500 bg-zinc-900 p-5 shadow-lg">
                        <div className="text-sm text-zinc-400">Daily Revenue</div>
                        <div className="mt-1 text-2xl font-bold text-white">Rs. {stats.dailyRevenue.toFixed(2)}</div>
                    </div>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg">
                    <h2 className="mb-4 text-lg font-semibold text-white">Upcoming Bookings</h2>
                    <div className="space-y-3">
                        {upcomingBookings.length > 0 ? (
                            upcomingBookings.map((booking) => (
                                <div key={booking.id} className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-sm">
                                    <div>
                                        <div className="font-semibold text-white">{booking.job_number || `#${booking.id}`}</div>
                                        <div className="text-zinc-400">{booking.customer?.name} • {booking.vehicle?.make} {booking.vehicle?.model}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium text-white">{booking.scheduled_at}</div>
                                        <div className="text-zinc-400 text-xs">{booking.status}</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-zinc-400">No upcoming bookings yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}