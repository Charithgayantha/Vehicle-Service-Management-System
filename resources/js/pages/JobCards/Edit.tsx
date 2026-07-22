import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface JobCard {
    id: number;
    job_number?: string;
    status: string;
    customer: { name: string };
    vehicle: { make: string; model: string; registration_number: string };
    mechanic: { name: string };
    problem_description?: string;
}

interface EditProps {
    jobCard: JobCard;
}

export default function Edit({ jobCard }: EditProps) {
    const { data, setData, put, processing, errors } = useForm({
        status: jobCard.status,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/job-cards/${jobCard.id}`);
    };

    return (
        <AppLayout>
            <Head title="Update Assigned Job" />

            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <Link
                        href="/job-cards"
                        className="mb-2 flex items-center gap-1 text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                        &larr; Back to Service Bookings
                    </Link>
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        Update Assigned Job
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {jobCard.job_number || `#${jobCard.id}`} — {jobCard.customer?.name}
                    </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="mb-6 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <p>
                            <span className="font-semibold">Vehicle:</span>{' '}
                            {jobCard.vehicle?.make} {jobCard.vehicle?.model} ({jobCard.vehicle?.registration_number})
                        </p>
                        <p>
                            <span className="font-semibold">Assigned Mechanic:</span>{' '}
                            {jobCard.mechanic?.name}
                        </p>
                        <p>
                            <span className="font-semibold">Issue:</span>{' '}
                            {jobCard.problem_description}
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Job Status <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                                required
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                            {errors.status && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.status}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4 dark:border-gray-700">
                            <Link
                                href="/job-cards"
                                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                            >
                                {processing ? 'Updating...' : 'Update Job'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
