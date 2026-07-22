import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        customer_name: "",
        vehicle_number: "",
        service_fee: "",
        parts_total: "",
        status: "pending",
    } as {
        customer_name: string;
        vehicle_number: string;
        service_fee: number | string;
        parts_total: number | string;
        status: string;
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/invoices");
    };

    return (
        <AppLayout>
            <Head title="Create New Invoice" />

            <div className="py-8 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Create New Invoice</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Bill customer service fees and spare parts usage.</p>
                    </div>
                    <Link
                        href="/invoices"
                        className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                        &larr; Back to Invoices
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Customer Name</label>
                            <input
                                type="text"
                                value={data.customer_name}
                                onChange={(e) => setData("customer_name", e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="e.g., John Doe"
                            />
                            {errors.customer_name && <div className="text-red-500 text-xs mt-1">{errors.customer_name}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Vehicle Number</label>
                            <input
                                type="text"
                                value={data.vehicle_number}
                                onChange={(e) => setData("vehicle_number", e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="e.g., CAB-1234"
                            />
                            {errors.vehicle_number && <div className="text-red-500 text-xs mt-1">{errors.vehicle_number}</div>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Service Fee (LKR)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.service_fee}
                                    onChange={(e) => setData("service_fee", e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="2500.00"
                                />
                                {errors.service_fee && <div className="text-red-500 text-xs mt-1">{errors.service_fee}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Parts Total Cost (LKR)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.parts_total}
                                    onChange={(e) => setData("parts_total", e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="5000.00"
                                />
                                {errors.parts_total && <div className="text-red-500 text-xs mt-1">{errors.parts_total}</div>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Payment Status</label>
                            <select
                                value={data.status}
                                onChange={(e) => setData("status", e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            >
                                <option value="pending">Pending</option>
                                <option value="paid">Paid</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                            {errors.status && <div className="text-red-500 text-xs mt-1">{errors.status}</div>}
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                Generate Invoice
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}