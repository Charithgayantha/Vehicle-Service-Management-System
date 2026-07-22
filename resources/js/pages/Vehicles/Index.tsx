import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

interface Vehicle {
    id: number;
    license_plate: string;
    model: string;
    color?: string;
    vin?: string;
    customer?: {
        name: string;
        phone: string;
    };
}

interface VehiclesIndexProps {
    vehicles: Vehicle[] | { data: Vehicle[] };
}

export default function VehiclesIndex({ vehicles }: VehiclesIndexProps) {
    const vehicleList = Array.isArray(vehicles) ? vehicles : (vehicles?.data || []);

    const handleDelete = (id: number, plate: string) => {
        if (window.confirm(`Are you sure you want to delete vehicle with license plate "${plate}"?`)) {
            router.delete(`/vehicles/${id}`);
        }
    };

    return (
        <AppLayout>
            <Head title="Vehicles Management" />

            <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Vehicles Management</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage registered customer vehicles and specifications.</p>
                    </div>
                    <Link
                        href="/vehicles/create"
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        + Register New Vehicle
                    </Link>
                </div>

                {/* Table Section */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700/50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">License Plate</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Vehicle</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Owner (Customer)</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Color / VIN</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {vehicleList.length > 0 ? (
                                    vehicleList.map((vehicle) => (
                                        <tr key={vehicle.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                                                {vehicle.license_plate}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-medium">
                                                {vehicle.model}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                                                <div className="font-medium text-gray-900 dark:text-white">{vehicle.customer?.name || 'N/A'}</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">{vehicle.customer?.phone}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                                                <div className="text-gray-900 dark:text-white">{vehicle.color || 'N/A'}</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">{vehicle.vin || 'No VIN'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                                <Link
                                                    href={`/vehicles/${vehicle.id}/edit`}
                                                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 font-semibold"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(vehicle.id, vehicle.license_plate)}
                                                    className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 font-semibold ml-4 cursor-pointer"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                            No vehicles found. Click "+ Register New Vehicle" to get started.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}