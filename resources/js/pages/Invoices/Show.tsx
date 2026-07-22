import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

export interface Invoice {
    id: number;
    invoice_number: string;
    customer_name: string;
    vehicle_number: string;
    service_fee: number;
    parts_total: number;
    total_amount: number;
    status: string;
    created_at: string;
}

interface ShowProps {
    invoice: Invoice;
}

export default function Show({ invoice }: ShowProps) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this invoice?")) {
            destroy(`/invoices/${invoice.id}`);
        }
    };

    return (
        <AppLayout>
            <Head title={`Invoice ${invoice.invoice_number}`} />

            <div className="py-8 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6 flex justify-between items-center print:hidden">
                    <Link
                        href="/invoices"
                        className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                        &larr; Back to Invoices
                    </Link>
                    <div className="space-x-3">
                        <button
                            onClick={() => window.print()}
                            className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 transition"
                        >
                            Print Invoice
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={processing}
                            className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 transition"
                        >
                            Delete
                        </button>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg border border-gray-200 dark:border-gray-700 p-8 space-y-6">
                    <div className="flex justify-between items-start border-b border-gray-200 dark:border-gray-700 pb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vehicle Service Center</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Official Billing & Invoice Statement</p>
                        </div>
                        <div className="text-right">
                            <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">{invoice.invoice_number}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Date: {new Date(invoice.created_at).toLocaleDateString()}</p>
                            <span className={`mt-2 px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                invoice.status === 'paid'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                    : invoice.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                            }`}>
                                {invoice.status.toUpperCase()}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="block text-gray-500 dark:text-gray-400">Customer Name:</span>
                            <span className="font-medium text-gray-900 dark:text-white text-base">{invoice.customer_name}</span>
                        </div>
                        <div>
                            <span className="block text-gray-500 dark:text-gray-400">Vehicle Number:</span>
                            <span className="font-medium text-gray-900 dark:text-white text-base">{invoice.vehicle_number}</span>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                                <tr>
                                    <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider pb-3">Description</th>
                                    <th className="text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider pb-3">Amount (LKR)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                                <tr>
                                    <td className="py-3 text-gray-900 dark:text-white">Service & Labor Fee</td>
                                    <td className="py-3 text-right text-gray-900 dark:text-white">LKR {Number(invoice.service_fee).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="py-3 text-gray-900 dark:text-white">Spare Parts Total</td>
                                    <td className="py-3 text-right text-gray-900 dark:text-white">LKR {Number(invoice.parts_total).toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">Total Due:</span>
                        <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">LKR {Number(invoice.total_amount).toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}