import type { Auth } from '@/types';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

type DashboardProps = {
    auth: Auth;
    stats: {
        todaysBookings: number;
        activeJobs: number;
        dailyRevenue: number;
    };
    lowStockItems: {
        item_name: string;
        stock_quantity: number;
    }[];
};

export default function Dashboard({ auth, stats, lowStockItems }: DashboardProps) {
    return (
        <AppLayout>
            <Head title="Dashboard" />

            <div className="py-8 text-zinc-100">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="border border-zinc-800 border-l-4 border-l-blue-500 bg-zinc-900 p-6 shadow-lg sm:rounded-2xl">
                            <div className="truncate text-sm font-medium text-zinc-400">
                                Today&apos;s Bookings
                            </div>
                            <div className="mt-1 text-3xl font-bold text-white">
                                {stats.todaysBookings}
                            </div>
                        </div>

                        <div className="border border-zinc-800 border-l-4 border-l-yellow-500 bg-zinc-900 p-6 shadow-lg sm:rounded-2xl">
                            <div className="truncate text-sm font-medium text-zinc-400">
                                Active Jobs
                            </div>
                            <div className="mt-1 text-3xl font-bold text-white">
                                {stats.activeJobs}
                            </div>
                        </div>

                        <div className="border border-zinc-800 border-l-4 border-l-green-500 bg-zinc-900 p-6 shadow-lg sm:rounded-2xl">
                            <div className="truncate text-sm font-medium text-zinc-400">
                                Daily Revenue
                            </div>
                            <div className="mt-1 text-3xl font-bold text-white">
                                Rs. {stats.dailyRevenue.toFixed(2)}
                            </div>
                        </div>
                    </div>

                    <div className="border border-zinc-800 bg-zinc-900 shadow-lg sm:rounded-2xl p-6">
                        <div className="border-b border-zinc-800 pb-4 mb-4">
                            <h3 className="text-lg font-semibold text-white">
                                Low Stock Alerts
                            </h3>
                        </div>

                        {lowStockItems.length > 0 ? (
                            <table className="min-w-full divide-y divide-zinc-800 text-sm">
                                <thead className="bg-zinc-950">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                                            Item Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                                            Remaining Stock
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800 text-zinc-300">
                                    {lowStockItems.map((item, index) => (
                                        <tr key={`${item.item_name}-${index}`} className="hover:bg-zinc-800/50 transition">
                                            <td className="px-6 py-4 text-sm font-medium text-white whitespace-nowrap">
                                                {item.item_name}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-zinc-300 whitespace-nowrap">
                                                {item.stock_quantity}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-400 border border-red-500/20">
                                                    Critical
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-sm text-zinc-400">
                                Inventory levels are looking good.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}