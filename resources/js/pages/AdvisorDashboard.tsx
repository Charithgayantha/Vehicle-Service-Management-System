import type { Auth } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

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

export default function AdvisorDashboard({ auth, stats, upcomingBookings }: DashboardProps) {
    return (
        <AppLayout>
            <Head title="Manager Dashboard" />

            <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold text">Manager Dashboard</h1>
                        <p className="text-sm text-gray-500">Create jobs, manage customers, and schedule repairs.</p>
                    </div>
                    <Link href="/job-cards/create" className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                        New Booking
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-lg border-l-4 border-blue-500 bg-white p-4 shadow-sm">
                        <div className="text-sm text-gray-500">Today&apos;s Bookings</div>
                        <div className="mt-1 text-2xl  font-semibold ">{stats.todaysBookings}</div>
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

                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900">Upcoming Bookings</h2>
                    <div className="space-y-3">
                        {upcomingBookings.length > 0 ? (
                            upcomingBookings.map((booking) => (
                                <div key={booking.id} className="flex items-center justify-between rounded border p-3 text-sm">
                                    <div>
                                        <div className="font-semibold">{booking.job_number || `#${booking.id}`}</div>
                                        <div className="text-gray-500">{booking.customer?.name} • {booking.vehicle?.make} {booking.vehicle?.model}</div>
                                    </div>
                                    <div className="text-right">
                                        <div>{booking.scheduled_at}</div>
                                        <div className="text-gray-500">{booking.status}</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">No upcoming bookings yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
