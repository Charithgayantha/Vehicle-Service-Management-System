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

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-6">
                            AI Service Summary Generator
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Vehicle Model</label>
                                <input
                                    type="text"
                                    value={data.vehicle_model}
                                    onChange={(e) => setData('vehicle_model', e.target.value)}
                                    placeholder="e.g., Toyota Premio 2015"
                                    className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Performed Services</label>
                                <input
                                    type="text"
                                    value={data.performed_services}
                                    onChange={(e) => setData('performed_services', e.target.value)}
                                    placeholder="e.g., Full oil change, brake pad replacement, and wheel alignment"
                                    className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Parts Replaced</label>
                                <textarea
                                    value={data.parts_replaced}
                                    onChange={(e) => setData('parts_replaced', e.target.value)}
                                    placeholder="e.g., Synthetic engine oil (5W-30), Front brake pads, Oil filter"
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                {processing ? 'Generating...' : 'Generate Service Summary'}
                            </button>
                        </form>

                        {error && (
                            <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 text-sm">
                                {error}
                            </div>
                        )}

                        {result && (
                            <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
                                <h3 className="text-lg font-medium text-gray-900">Professional Job Summary</h3>
                                <div className="bg-white p-4 rounded shadow-sm border space-y-2">
                                    <span className="text-xs font-semibold text-green-600 uppercase">Status: {result.status}</span>
                                    <p className="text-gray-800 mt-1 whitespace-pre-line leading-relaxed">{result.job_summary}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}