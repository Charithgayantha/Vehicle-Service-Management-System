import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface JobCard {
    id: number;
    job_number?: string;
    status: string;
    customer: { name: string };
    vehicle: { make: string; model: string; registration_number: string };
    mechanic: { name: string };
    scheduled_at?: string;
    problem_description?: string;
}

interface ShowProps {
    jobCard: JobCard;
}

export default function Show({ jobCard }: ShowProps) {
    return (
        <AppLayout>
            <Head title="Assigned Job Details" />

            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <Link
                        href="/job-cards"
                        className="mb-2 flex items-center gap-1 text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                        &larr; Back to Service Bookings
                    </Link>
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        Assigned Job Details
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {jobCard.job_number || `#${jobCard.id}`} — {jobCard.customer?.name}
                    </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <dl className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                        <div>
                            <dt className="font-semibold">Vehicle</dt>
                            <dd>{jobCard.vehicle?.make} {jobCard.vehicle?.model} ({jobCard.vehicle?.registration_number})</dd>
                        </div>
                        <div>
                            <dt className="font-semibold">Assigned Mechanic</dt>
                            <dd>{jobCard.mechanic?.name}</dd>
                        </div>
                        <div>
                            <dt className="font-semibold">Scheduled Date</dt>
                            <dd>{jobCard.scheduled_at}</dd>
                        </div>
                        <div>
                            <dt className="font-semibold">Status</dt>
                            <dd>{jobCard.status}</dd>
                        </div>
                        <div>
                            <dt className="font-semibold">Problem Description</dt>
                            <dd>{jobCard.problem_description}</dd>
                        </div>
                    </dl>

                    <div className="mt-6 flex justify-end">
                        <Link
                            href={`/job-cards/${jobCard.id}/edit`}
                            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                        >
                            Update Status
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
