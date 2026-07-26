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

            <div className="w-full space-y-6 px-6 py-8 lg:px-10 text-gray-900 dark:text-zinc-100">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Admin Dashboard</h1>
                    <p className="text-sm text-gray-500 dark:text-zinc-400">Full system metrics, user activity, and revenue overview.</p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div style={{ borderLeftWidth: '5px', borderLeftColor: '#3b82f6' }} className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-lg">
                        <div className="text-sm text-gray-500 dark:text-zinc-400">Today&apos;s Bookings</div>
                        <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{stats.todaysBookings}</div>
                    </div>
                    <div style={{ borderLeftWidth: '5px', borderLeftColor: '#eab308' }} className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-lg">
                        <div className="text-sm text-gray-500 dark:text-zinc-400">Active Jobs</div>
                        <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{stats.activeJobs}</div>
                    </div>
                    <div style={{ borderLeftWidth: '5px', borderLeftColor: '#22c55e' }} className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-lg">
                        <div className="text-sm text-gray-500 dark:text-zinc-400">Daily Revenue</div>
                        <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Rs. {stats.dailyRevenue.toFixed(2)}</div>
                    </div>
                    <div style={{ borderLeftWidth: '5px', borderLeftColor: '#ef4444' }} className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-lg">
                        <div className="text-sm text-gray-500 dark:text-zinc-400">Low Stock Items</div>
                        <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{stats.lowStockCount}</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-lg">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">System Overview</h2>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 p-4">
                                <div className="text-gray-500 dark:text-zinc-400">Customers</div>
                                <div className="mt-1 text-xl font-bold text-gray-900 dark:text-white">{stats.totalCustomers}</div>
                            </div>
                            <div className="rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 p-4">
                                <div className="text-gray-500 dark:text-zinc-400">Vehicles</div>
                                <div className="mt-1 text-xl font-bold text-gray-900 dark:text-white">{stats.totalVehicles}</div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-lg">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Low Stock Alerts</h2>
                        <div className="space-y-3">
                            {lowStockItems.length > 0 ? (
                                lowStockItems.map((item, index) => (
                                    <div key={`${item.item_name}-${index}`} className="flex items-center justify-between rounded-xl border border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">
                                        <span className="font-medium">{item.item_name}</span>
                                        <span className="font-bold text-red-600 dark:text-red-400">{item.stock_quantity} left</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-zinc-400">Inventory is healthy.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-lg overflow-hidden">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Recent Invoices</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-800 text-sm">
                            <thead>
                                <tr className="text-gray-500 dark:text-zinc-400 bg-gray-50 dark:bg-zinc-950">
                                    <th className="px-4 py-3.5 text-left font-medium">Invoice</th>
                                    <th className="px-4 py-3.5 text-left font-medium">Customer</th>
                                    <th className="px-4 py-3.5 text-left font-medium">Vehicle</th>
                                    <th className="px-4 py-3.5 text-left font-medium">Status</th>
                                    <th className="px-4 py-3.5 text-left font-medium">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-zinc-800 text-gray-700 dark:text-zinc-300">
                                {recentInvoices.map((invoice) => (
                                    <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition">
                                        <td className="px-4 py-4 font-medium text-gray-900 dark:text-white">{invoice.invoice_number}</td>
                                        <td className="px-4 py-4">{invoice.customer_name}</td>
                                        <td className="px-4 py-4">{invoice.vehicle_number}</td>
                                        <td className="px-4 py-4">
                                            <span className="inline-block px-2.5 py-1 text-xs rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                                                {invoice.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white">Rs. {Number(invoice.total_amount || 0).toFixed(2)}</td>
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
