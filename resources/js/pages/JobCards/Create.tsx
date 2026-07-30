import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

interface Customer {
    id: number;
    name: string;
}

interface Vehicle {
    id: number;
    make: string;
    model: string;
    registration_number: string;
}

interface Mechanic {
    id: number;
    name: string;
    specialization: string;
}

interface Part {
    id: number;
    name: string;
    price: number;
    stock_quantity: number;
}

interface CreateProps {
    customers: Customer[];
    vehicles: Vehicle[];
    mechanics: Mechanic[];
    inventoryParts: Part[]; // Added inventory parts prop[cite: 5]
}

export default function Create({ customers, vehicles, mechanics, inventoryParts }: CreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        customer_id: "",
        vehicle_id: "",
        mechanic_id: "",
        scheduled_at: "", 
        status: "Pending",
        problem_description: "", 
        parts_used: [] as Array<{ id: number; name: string; quantity: number; unit_price: number }>, // Added array for parts[cite: 5]
    });

    // Local state for part selection
    const [selectedPartId, setSelectedPartId] = useState("");
    const [partQuantity, setPartQuantity] = useState(1);

    const handleAddPart = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!selectedPartId) return;

        const part = inventoryParts.find(p => p.id === parseInt(selectedPartId));
        if (part) {
            setData("parts_used", [
                ...data.parts_used,
                { id: part.id, name: part.name, quantity: partQuantity, unit_price: part.price }
            ]);
            setSelectedPartId("");
            setPartQuantity(1);
        }
    };

    const handleRemovePart = (indexToRemove: number) => {
        setData("parts_used", data.parts_used.filter((_, index) => index !== indexToRemove));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/job-cards");
    };

    return (
        <AppLayout>
            <Head title="New Service Booking" />

            <div className="py-8 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <Link
                        href="/job-cards"
                        className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 mb-2"
                    >
                        &larr; Back to Service Bookings
                    </Link>
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Create Service Appointment</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Schedule an appointment and assign a mechanic.</p>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <form onSubmit={submit} className="space-y-6">
                        {/* Customer Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Customer <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={data.customer_id}
                                onChange={(e) => setData("customer_id", e.target.value)}
                                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                                required
                            >
                                <option value="">Select Customer</option>
                                {customers.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            {errors.customer_id && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.customer_id}</p>}
                        </div>

                        {/* Vehicle Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Vehicle <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={data.vehicle_id}
                                onChange={(e) => setData("vehicle_id", e.target.value)}
                                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                                required
                            >
                                <option value="">Select Vehicle</option>
                                {vehicles.map((v) => (
                                    <option key={v.id} value={v.id}>
                                        {v.make} {v.model} - {v.registration_number}
                                    </option>
                                ))}
                            </select>
                            {errors.vehicle_id && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.vehicle_id}</p>}
                        </div>

                        {/* Mechanic Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Assign Mechanic <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={data.mechanic_id}
                                onChange={(e) => setData("mechanic_id", e.target.value)}
                                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                                required
                            >
                                <option value="">Select Mechanic</option>
                                {mechanics.map((m) => (
                                    <option key={m.id} value={m.id}>
                                        {m.name} ({m.specialization})
                                    </option>
                                ))}
                            </select>
                            {errors.mechanic_id && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.mechanic_id}</p>}
                        </div>

                        {/* Scheduled Date & Time */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Appointment Date & Time <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="datetime-local"
                                value={data.scheduled_at}
                                onChange={(e) => setData("scheduled_at", e.target.value)}
                                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                                required
                            />
                            {errors.scheduled_at && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.scheduled_at}</p>}
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Job Status <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={data.status}
                                onChange={(e) => setData("status", e.target.value)}
                                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                                required
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                            {errors.status && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.status}</p>}
                        </div>

                        {/* Problem Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Problem Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                rows={3}
                                value={data.problem_description}
                                onChange={(e) => setData("problem_description", e.target.value)}
                                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                                placeholder="Describe customer complaints or service requests..."
                                required
                            />
                            {errors.problem_description && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.problem_description}</p>}
                        </div>

                        {/* --- NEW PARTS SECTION --- */}
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Required Parts</h3>
                            
                            <div className="flex gap-4 mb-4">
                                <select 
                                    value={selectedPartId} 
                                    onChange={(e) => setSelectedPartId(e.target.value)}
                                    className="flex-1 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                                >
                                    <option value="">Select a Part (Optional)</option>
                                    {inventoryParts?.map(part => (
                                        <option key={part.id} value={part.id}>
                                            {part.name} (In Stock: {part.stock_quantity})
                                        </option>
                                    ))}
                                </select>

                                <input 
                                    type="number" 
                                    min="1"
                                    value={partQuantity}
                                    onChange={(e) => setPartQuantity(parseInt(e.target.value))}
                                    className="w-24 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                                />

                                <button 
                                    onClick={handleAddPart}
                                    className="inline-flex justify-center px-4 py-2 text-sm font-semibold text-white bg-green-400 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Add Part
                                </button>
                            </div>

                            {/* Added Parts List */}
                            {data.parts_used.length > 0 && (
                                <ul className="mt-4 space-y-2">
                                    {data.parts_used.map((item, index) => (
                                        <li key={index} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600">
                                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                                {item.quantity}x {item.name}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemovePart(index)}
                                                className="text-red-500 hover:text-red-700 text-sm font-medium"
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                            <Link
                                href="/job-cards"
                                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex justify-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 cursor-pointer"
                            >
                                {processing ? "Booking..." : "Create Booking"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}