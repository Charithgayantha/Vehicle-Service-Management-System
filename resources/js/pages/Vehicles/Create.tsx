import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { index, store } from '@/routes/vehicles';

interface Customer {
    id: number;
    name: string;
    phone?: string;
}

interface Props {
    customers: Customer[];
}

export default function Create({ customers }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        customer_id: '',
        make: '',
        model: '',
        year: new Date().getFullYear(),
        license_plate: '',
        vin: '',
        color: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store().url);
    };

    return (
        <div className="py-12 max-w-3xl mx-auto sm:px-6 lg:px-8">
            <Head title="Register Vehicle" />

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Register New Vehicle</h1>
                    <Link href={index().url} className="text-gray-600 hover:text-gray-900">
                        &larr; Back to Vehicles
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Customer Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Owner (Customer) *</label>
                        <select
                            value={data.customer_id}
                            onChange={(e) => setData('customer_id', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 bg-white text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                            required
                        >
                            <option value="" className="text-gray-500">-- Select a Customer --</option>
                            {customers.map((customer) => (
                                <option key={customer.id} value={customer.id} className="text-gray-900">
                                    {customer.name} {customer.phone ? `(${customer.phone})` : ''}
                                </option>
                            ))}
                        </select>
                        {errors.customer_id && <p className="mt-1 text-sm text-red-600">{errors.customer_id}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Make */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Make *</label>
                            <input
                                type="text"
                                placeholder="e.g., Toyota, Honda"
                                value={data.make}
                                onChange={(e) => setData('make', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 bg-white text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                required
                            />
                            {errors.make && <p className="mt-1 text-sm text-red-600">{errors.make}</p>}
                        </div>

                        {/* Model */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Model *</label>
                            <input
                                type="text"
                                placeholder="e.g., Corolla, Civic"
                                value={data.model}
                                onChange={(e) => setData('model', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 bg-white text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                required
                            />
                            {errors.model && <p className="mt-1 text-sm text-red-600">{errors.model}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Year */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Year *</label>
                            <input
                                type="number"
                                min="1900"
                                max={new Date().getFullYear() + 1}
                                value={data.year}
                                onChange={(e) => setData('year', parseInt(e.target.value) || 0)}
                                className="mt-1 block w-full rounded-md border-gray-300 bg-white text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                required
                            />
                            {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year}</p>}
                        </div>

                        {/* License Plate */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">License Plate *</label>
                            <input
                                type="text"
                                placeholder="e.g., CAB-1234"
                                value={data.license_plate}
                                onChange={(e) => setData('license_plate', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 bg-white text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 uppercase"
                                required
                            />
                            {errors.license_plate && <p className="mt-1 text-sm text-red-600">{errors.license_plate}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* VIN */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">VIN (Optional)</label>
                            <input
                                type="text"
                                placeholder="Chassis number / VIN"
                                value={data.vin}
                                onChange={(e) => setData('vin', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 bg-white text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 font-mono"
                            />
                            {errors.vin && <p className="mt-1 text-sm text-red-600">{errors.vin}</p>}
                        </div>

                        {/* Color */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Color (Optional)</label>
                            <input
                                type="text"
                                placeholder="e.g., Pearl White, Black"
                                value={data.color}
                                onChange={(e) => setData('color', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 bg-white text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                            />
                            {errors.color && <p className="mt-1 text-sm text-red-600">{errors.color}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t">
                        <Link
                            href={index().url}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow disabled:opacity-50 transition"
                        >
                            {processing ? 'Saving...' : 'Register Vehicle'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}