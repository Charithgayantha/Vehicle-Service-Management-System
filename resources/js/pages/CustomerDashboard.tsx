import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { Auth } from '@/types';

interface DashboardProps {
    auth: Auth;
    customerVehicles: Array<{
        id: number;
        make: string;
        model: string;
        license_plate: string;
        color: string;
    }>;
    customerInvoices: Array<{
        id: number;
        invoice_number: string;
        vehicle_number: string;
        total_amount: number;
        status: string;
    }>;
}

export default function CustomerDashboard({ customerVehicles, customerInvoices }: DashboardProps) {
    return (
        <AppLayout>
            <Head title="Customer Dashboard" />

            <div className="w-full space-y-6 px-6 py-8 lg:px-10 text-gray-900 dark:text-zinc-100">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Customer Dashboard</h1>
                    <p className="text-sm text-gray-500 dark:text-zinc-400">Track your service status and recent invoices.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div style={{ borderLeftWidth: '5px', borderLeftColor: '#3b82f6' }} className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-lg">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">My Vehicles</h2>
                        <div className="space-y-3">
                            {customerVehicles.length > 0 ? (
                                customerVehicles.map((vehicle) => (
                                    <div key={vehicle.id} className="rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 p-4 text-sm">
                                        <div className="font-semibold text-gray-900 dark:text-white">{vehicle.make} {vehicle.model}</div>
                                        <div className="text-gray-500 dark:text-zinc-400">Plate: {vehicle.license_plate} • Color: {vehicle.color}</div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-zinc-400">No linked vehicles found yet.</p>
                            )}
                        </div>
                    </div>

                    <div style={{ borderLeftWidth: '5px', borderLeftColor: '#22c55e' }} className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-lg">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Past Invoices</h2>
                        <div className="space-y-3">
                            {customerInvoices.length > 0 ? (
                                customerInvoices.map((invoice) => (
                                    <div key={invoice.id} className="rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 p-4 text-sm">
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-gray-900 dark:text-white">{invoice.invoice_number}</span>
                                            <span className="inline-block px-2.5 py-1 text-xs rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">{invoice.status}</span>
                                        </div>
                                        <div className="text-gray-500 dark:text-zinc-400 mt-1">Vehicle: {invoice.vehicle_number}</div>
                                        <div className="mt-1 font-medium text-gray-900 dark:text-white">Rs. {invoice.total_amount.toFixed(2)}</div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-zinc-400">No invoices available yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}