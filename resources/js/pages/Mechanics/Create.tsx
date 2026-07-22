import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { store } from "@/actions/App/Http/Controllers/MechanicController";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        employee_id: "",
        specialization: "",
        contact: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store.url());
    };

    return (
        <AppLayout>
            <Head title="Add New Mechanic" />

            <div className="py-8 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <Link
                        href="/mechanics"
                        className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 mb-2"
                    >
                        &larr; Back to Mechanics
                    </Link>
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Add New Mechanic</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Enter the mechanic's details below.</p>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <form onSubmit={submit} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                                placeholder="Jane Smith"
                                required
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                        </div>

                        {/* Employee ID Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Employee ID <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.employee_id}
                                onChange={(e) => setData("employee_id", e.target.value)}
                                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                                placeholder="EMP-001"
                                required
                            />
                            {errors.employee_id && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.employee_id}</p>}
                        </div>

                        {/* Specialization Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Specialization <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.specialization}
                                onChange={(e) => setData("specialization", e.target.value)}
                                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                                placeholder="Engine Diagnostics, Electrical"
                                required
                            />
                            {errors.specialization && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.specialization}</p>}
                        </div>

                        {/* Contact Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Contact Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.contact}
                                onChange={(e) => setData("contact", e.target.value)}
                                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                                placeholder="0712345678"
                                required
                            />
                            {errors.contact && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.contact}</p>}
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                            <Link
                                href="/mechanics"
                                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex justify-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 cursor-pointer"
                            >
                                {processing ? "Saving..." : "Save Mechanic"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}