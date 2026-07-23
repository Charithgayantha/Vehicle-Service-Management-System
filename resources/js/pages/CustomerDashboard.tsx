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

            <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Customer Dashboard</h1>
                    <p className="text-sm text-gray-500">Track your service status and recent invoices.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900">My Vehicles</h2>
                        <div className="space-y-3">
                            {customerVehicles.length > 0 ? (
                                customerVehicles.map((vehicle) => (
                                    <div key={vehicle.id} className="rounded border p-3 text-sm">
                                        <div className="font-semibold">{vehicle.make} {vehicle.model}</div>
                                        <div className="text-gray-500">Plate: {vehicle.license_plate} • Color: {vehicle.color}</div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">No linked vehicles found yet.</p>
                            )}
                        </div>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900">Past Invoices</h2>
                        <div className="space-y-3">
                            {customerInvoices.length > 0 ? (
                                customerInvoices.map((invoice) => (
                                    <div key={invoice.id} className="rounded border p-3 text-sm">
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold">{invoice.invoice_number}</span>
                                            <span>{invoice.status}</span>
                                        </div>
                                        <div className="text-gray-500">Vehicle: {invoice.vehicle_number}</div>
                                        <div className="mt-1 font-medium">Rs. {invoice.total_amount.toFixed(2)}</div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">No invoices available yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
