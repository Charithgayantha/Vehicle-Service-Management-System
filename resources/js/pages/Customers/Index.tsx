import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { create, edit, destroy } from "@/actions/App/Http/Controllers/CustomerController";

export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    address?: string;
    created_at?: string;
}

interface IndexProps {
    // Safely handles both direct arrays and Laravel paginated responses ({ data: [...] })
    customers: Customer[] | { data: Customer[] };
}

export default function Index({ customers }: IndexProps) {
    // Normalize the customer list so TypeScript and React never crash
    const customerList = Array.isArray(customers) ? customers : (customers?.data || []);

    const handleDelete = (id: number, name: string) => {
        if (window.confirm(`Are you sure you want to delete customer "${name}"?`)) {
            router.delete(destroy.url(id));
        }
    };

    return (
        <AppLayout >
            <Head title="Customers Management" />

            <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6 ">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Customers</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your service center clients and contact details.</p>
                    </div>
                    <Link
                        href={create.url()}
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        + Add New Customer
                    </Link>
                </div>

                {/* Table Section */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700/50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Phone</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {customerList.length > 0 ? (
                                    customerList.map((customer) => (
                                        <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                #{customer.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-medium">
                                                {customer.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                                                {customer.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                                                {customer.phone}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                                <Link
                                                    href={edit.url(customer.id)}
                                                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 font-semibold"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(customer.id, customer.name)}
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
                                            No customers found. Click "+ Add New Customer" to get started.
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