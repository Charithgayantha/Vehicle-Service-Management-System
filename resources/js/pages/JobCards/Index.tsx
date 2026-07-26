import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

export interface JobCard {
    id: number;
    job_number?: string;
    customer: { name: string };
    vehicle: { make: string; model: string; registration_number: string };
    mechanic: { name: string };
    scheduled_at: string;
    status: string;
    problem_description?: string;
}

interface IndexProps {
    jobCards: JobCard[] | { data: JobCard[] };
}

export default function Index({ jobCards }: IndexProps) {
    const jobCardList = Array.isArray(jobCards) ? jobCards : (jobCards?.data || []);
    const { auth } = usePage<{ auth: { user: { email: string } } }>().props;
    const isMechanic = auth?.user?.email?.toLowerCase().includes('mechanic');

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-500/20";
            case "In Progress":
                return "bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20";
            case "Completed":
                return "bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-400 border border-green-200 dark:border-green-500/20";
            case "Cancelled":
                return "bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-400 border border-red-200 dark:border-red-500/20";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-300 border border-gray-200 dark:border-zinc-700";
        }
    };

    return (
        <AppLayout>
            <Head title="Service Appointments & Job Cards" />

            <div className="py-8 w-full px-6 lg:px-10 text-gray-900 dark:text-zinc-100">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Service Bookings & Job Cards</h1>
                        <p className="text-sm text-gray-500 dark:text-zinc-400">Track service appointments, active repairs, and mechanic assignments.</p>
                    </div>
                    {!isMechanic && (
                        <Link
                            href="/job-cards/create"
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-xl font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition ease-in-out duration-150"
                        >
                            + New Service Booking
                        </Link>
                    )}
                </div>

                {/* Outer Card Container with rounded-2xl and overflow-hidden to fix the corner clipping issue */}
                <div className="bg-white dark:bg-zinc-900 shadow-lg rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-800">
                            <thead className="bg-gray-50 dark:bg-zinc-950">
                                <tr>
                                    <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">ID / Job #</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Vehicle</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Assigned Mechanic</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Scheduled Date</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3.5 text-right text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-zinc-900 divide-y divide-gray-200 dark:divide-zinc-800 text-gray-700 dark:text-zinc-300">
                                {jobCardList.length > 0 ? (
                                    jobCardList.map((job) => (
                                        <tr key={job.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                                                {job.job_number || `#${job.id}`}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-medium">
                                                {job.customer?.name ?? "N/A"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-zinc-300">
                                                {job.vehicle ? `${job.vehicle.make} ${job.vehicle.model}${job.vehicle.registration_number ? ` (${job.vehicle.registration_number})` : ''}` : "N/A"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-zinc-300">
                                                {job.mechanic?.name ?? "Unassigned"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-zinc-300">
                                                {job.scheduled_at}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(job.status)}`}>
                                                    {job.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                                <Link
                                                    href={`/job-cards/${job.id}/edit`}
                                                    className="inline-flex items-center rounded-xl bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-500 transition"
                                                >
                                                    Update Status
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-12 text-center text-gray-500 dark:text-zinc-400">
                                            No service bookings found. Click "+ New Service Booking" to create one.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}