import type { Auth } from '@/types';
import { Head } from '@inertiajs/react';

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
        <>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="border-l-4 border-blue-500 bg-white p-6 shadow-sm sm:rounded-lg">
                            <div className="truncate text-sm font-medium text-gray-500">
                                Today&apos;s Bookings
                            </div>
                            <div className="mt-1 text-3xl font-semibold text-gray-900">
                                {stats.todaysBookings}
                            </div>
                        </div>

                        <div className="border-l-4 border-yellow-500 bg-white p-6 shadow-sm sm:rounded-lg">
                            <div className="truncate text-sm font-medium text-gray-500">
                                Active Jobs
                            </div>
                            <div className="mt-1 text-3xl font-semibold text-gray-900">
                                {stats.activeJobs}
                            </div>
                        </div>

                        <div className="border-l-4 border-green-500 bg-white p-6 shadow-sm sm:rounded-lg">
                            <div className="truncate text-sm font-medium text-gray-500">
                                Daily Revenue
                            </div>
                            <div className="mt-1 text-3xl font-semibold text-gray-900">
                                Rs. {stats.dailyRevenue.toFixed(2)}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="border-b border-gray-200 p-6 text-gray-900">
                            <h3 className="mb-4 text-lg font-semibold text-red-600">
                                Low Stock Alerts
                            </h3>

                            {lowStockItems.length > 0 ? (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Item Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Remaining Stock
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {lowStockItems.map((item, index) => (
                                            <tr key={`${item.item_name}-${index}`}>
                                                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                    {item.item_name}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                    {item.stock_quantity}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                                                        Critical
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-sm text-gray-500">
                                    Inventory levels are looking good.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}