import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import type { Auth } from '@/types';
import { useState } from 'react';
import axios from 'axios';

interface SummaryProps {
    auth: Auth;
    [key: string]: unknown;
}

interface SummaryResult {
    job_summary: string;
    status: string;
}

export default function AiServiceSummary({ auth }: SummaryProps) {
    const { data, setData, processing } = useForm({
        vehicle_model: '',
        performed_services: '',
        parts_replaced: '',
    });

    const [result, setResult] = useState<SummaryResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setResult(null);

        try {
            const response = await axios.post('/api/generate-summary', data);
            setResult(response.data);
        } catch (err) {
            setError('Failed to generate summary. Please check your inputs.');
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="AI Service Summary" />

            <div className="py-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        AI Service Summary Generator
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Generate professional diagnostic logs and job reports instantly using AI.
                    </p>
                </div>

                {/* Main Card Section */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Vehicle Model
                            </label>
                            <input
                                type="text"
                                value={data.vehicle_model}
                                onChange={(e) => setData('vehicle_model', e.target.value)}
                                placeholder="e.g., Toyota Premio 2015"
                                className="w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3.5 py-2.5"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Performed Services
                            </label>
                            <input
                                type="text"
                                value={data.performed_services}
                                onChange={(e) => setData('performed_services', e.target.value)}
                                placeholder="e.g., Full oil change, brake pad replacement, and wheel alignment"
                                className="w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3.5 py-2.5"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Parts Replaced
                            </label>
                            <textarea
                                value={data.parts_replaced}
                                onChange={(e) => setData('parts_replaced', e.target.value)}
                                placeholder="e.g., Synthetic engine oil (5W-30), Front brake pads, Oil filter"
                                rows={3}
                                className="w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3.5 py-2.5"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 cursor-pointer"
                        >
                            {processing ? 'Generating...' : 'Generate Service Summary'}
                        </button>
                    </form>

                    {error && (
                        <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-300 text-sm rounded-r-md">
                            {error}
                        </div>
                    )}

                    {result && (
                        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                Professional Job Summary
                            </h3>
                            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700 space-y-3">
                                <div>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 uppercase tracking-wide">
                                        Status: {result.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                                    {result.job_summary}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}