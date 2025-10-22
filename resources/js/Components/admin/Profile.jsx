// resources/js/Components/admin/ContentProfile.jsx
import React, { useState } from "react";

function ContentProfile({ isSidebarOpen }) {
    const [formData, setFormData] = useState({
        name: "John Doe",
        email: "john@example.com",
        phone: "+62 812 3456 7890",
        position: "Administrator",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Data profil:", formData);
        // Untuk integrasi backend:
        // import { Inertia } from '@inertiajs/react';
        // Inertia.post('/admin/profile', formData, {
        //   onSuccess: () => alert('Profil diperbarui!'),
        //   onError: (errors) => console.log(errors),
        // });
    };

    return (
        <div
            className={`flex-1 p-6 transition-all duration-300 ${
                isSidebarOpen ? "md:ml-64" : "md:ml-16"
            }`}
        >
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-sky-900">
                    Profil Pengguna
                </h1>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Cari..."
                        className="pl-10 pr-4 py-2 rounded-full bg-white/80 border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm"
                    />
                    <svg
                        className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
            </header>
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md border border-sky-100/30">
                <h2 className="text-xl font-bold text-sky-900 mb-4">
                    Edit Profil
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm text-sky-600 mb-1">
                            Nama Lengkap
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-lg bg-white/80 border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-sky-600 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-lg bg-white/80 border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-sky-600 mb-1">
                            Nomor Telepon
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-lg bg-white/80 border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-sky-600 mb-1">
                            Jabatan
                        </label>
                        <input
                            type="text"
                            name="position"
                            value={formData.position}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-lg bg-white/80 border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
                        />
                    </div>
                </div>
                <button
                    onClick={handleSubmit}
                    className="mt-6 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                >
                    Simpan Perubahan
                </button>
            </div>
        </div>
    );
}

export default ContentProfile;
