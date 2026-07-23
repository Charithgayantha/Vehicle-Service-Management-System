import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { Auth } from '@/types';

interface DashboardProps {
    auth: Auth;
    stats: {
        todaysBookings: number;
        activeJobs: number;
        dailyRevenue: number;
        totalCustomers: number;
        totalVehicles: number;
        lowStockCount: number;
    };
    lowStockItems: Array<{
        item_name: string;
        stock_quantity: number;
    }>;
    recentInvoices: Array<{
        id: number;
        invoice_number: string;
        customer_name: string;
        vehicle_number: string;
        total_amount: number;
        status: string;
    }>;
}

export default function AdminDashboard({ stats, lowStockItems, recentInvoices }: DashboardProps) {
    return (
        <AppLayout>
            <Head title="Admin Dashboard" />

            <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
                <div>
                    <h1 className="text-2xl font-semibold ">Admin Dashboard</h1>
                    <p className="text-sm text-gray-500">Full system metrics, user activity, and revenue overview.</p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div className="rounded-lg border-l-4 border-blue-500 bg-white p-4 shadow-sm">
                        <div className="text-sm text-gray-500">Today&apos;s Bookings</div>
                        <div className="mt-1 text-2xl font-semibold text-black">{stats.todaysBookings}</div>
                    </div>
                    <div className="rounded-lg border-l-4 border-yellow-500 bg-white p-4 shadow-sm">
                        <div className="text-sm text-gray-500">Active Jobs</div>
                        <div className="mt-1 text-2xl font-semibold text-black">{stats.activeJobs}</div>
                    </div>
                    <div className="rounded-lg border-l-4 border-green-500 bg-white p-4 shadow-sm">
                        <div className="text-sm text-gray-500">Daily Revenue</div>
                        <div className="mt-1 text-2xl font-semibold text-black">Rs. {stats.dailyRevenue.toFixed(2)}</div>
                    </div>
                    <div className="rounded-lg border-l-4 border-red-500 bg-white p-4 shadow-sm">
                        <div className="text-sm text-gray-500">Low Stock Items</div>
                        <div className="mt-1 text-2xl font-semibold text-black">{stats.lowStockCount}</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900">System Overview</h2>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="rounded border bg-gray-50 p-3">
                                <div className="text-gray-500">Customers</div>
                                <div className="mt-1 text-xl font-semibold">{stats.totalCustomers}</div>
                            </div>
                            <div className="rounded border bg-gray-50 p-3">
                                <div className="text-gray-500">Vehicles</div>
                                <div className="mt-1 text-xl font-semibold">{stats.totalVehicles}</div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900">Low Stock Alerts</h2>
                        <div className="space-y-2">
                            {lowStockItems.length > 0 ? (
                                lowStockItems.map((item, index) => (
                                    <div key={`${item.item_name}-${index}`} className="flex items-center justify-between rounded bg-red-50 px-3 py-2 text-sm">
                                        <span>{item.item_name}</span>
                                        <span className="font-semibold text-red-700">{item.stock_quantity} left</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">Inventory is healthy.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900">Recent Invoices</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead>
                                <tr>
                                    <th className="px-3 py-2 text-left">Invoice</th>
                                    <th className="px-3 py-2 text-left">Customer</th>
                                    <th className="px-3 py-2 text-left">Vehicle</th>
                                    <th className="px-3 py-2 text-left">Status</th>
                                    <th className="px-3 py-2 text-left">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentInvoices.map((invoice) => (
                                    <tr key={invoice.id} className="border-t">
                                        <td className="px-3 py-2">{invoice.invoice_number}</td>
                                        <td className="px-3 py-2">{invoice.customer_name}</td>
                                        <td className="px-3 py-2">{invoice.vehicle_number}</td>
                                        <td className="px-3 py-2">{invoice.status}</td>
                                        <td className="px-3 py-2">Rs. {Number(invoice.total_amount || 0).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
