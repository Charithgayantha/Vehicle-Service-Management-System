import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { create, destroy, edit } from '@/routes/vehicles';

interface Customer {
    id: number;
    name: string;
    phone?: string;
}

interface Vehicle {
    id: number;
    customer_id: number;
    make: string;
    model: string;
    year: number;
    license_plate: string;
    vin?: string;
    color?: string;
    customer?: Customer;
}

interface Props {
    vehicles: Vehicle[];
}

export default function Index({ vehicles }: Props) {
    const handleDelete = (id: number, plate: string) => {
        if (confirm(`Are you sure you want to delete vehicle (${plate})?`)) {
            router.delete(destroy(id).url);
        }
    };

    return (
        <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
            <Head title="Vehicles" />

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Vehicles Management</h1>
                    <Link
                        href={create().url}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-150"
                    >
                        + Register New Vehicle
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License Plate</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner (Customer)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color / VIN</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {vehicles.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                        No vehicles registered yet.
                                    </td>
                                </tr>
                            ) : (
                                vehicles.map((vehicle) => (
                                    <tr key={vehicle.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                                            {vehicle.license_plate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                            {vehicle.year} {vehicle.make} {vehicle.model}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                            {vehicle.customer ? (
                                                <div>
                                                    <div className="font-medium text-gray-900">{vehicle.customer.name}</div>
                                                    <div className="text-xs text-gray-500">{vehicle.customer.phone || 'No phone'}</div>
                                                </div>
                                            ) : (
                                                <span className="text-red-500 italic">Unassigned</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div>{vehicle.color || 'N/A'}</div>
                                            <div className="text-xs text-gray-400 font-mono">{vehicle.vin || 'No VIN'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                            <Link
                                                href={edit(vehicle.id).url}
                                                className="text-indigo-600 hover:text-indigo-900 font-semibold"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(vehicle.id, vehicle.license_plate)}
                                                className="text-red-600 hover:text-red-900 font-semibold"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}