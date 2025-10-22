import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function InputForm() {
    const { data, setData, post, processing, errors } = useForm({
        name: "Token users",
        email: "",
        message: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Kirim data ke controller Laravel
        post("/ClassEbook", {
            onSuccess: () => {
                // Reset form setelah berhasil
                setData({
                    name: "",
                    email: "",
                    message: "",
                });
            },
            onError: (errors) => {
                console.log("Validation errors:", errors);
            },
        });
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Form Input
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Input Nama */}
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Nama
                    </label>
                    <input
                        type="text"
                        id="name"
                        value="Token"
                        onChange={(e) => setData("name", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Masukkan nama Anda"
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Input Email */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Masukkan email Anda"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Input Message */}
                <div>
                    <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Pesan
                    </label>
                    <textarea
                        id="message"
                        value={data.message}
                        onChange={(e) => setData("message", e.target.value)}
                        rows="4"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.message
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                        placeholder="Masukkan pesan Anda"
                    />
                    {errors.message && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={processing}
                    className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                        processing
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    }`}
                >
                    {processing ? "Mengirim..." : "Kirim"}
                </button>
            </form>
        </div>
    );
}
