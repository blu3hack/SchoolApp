// resources/js/Components/admin/Content.jsx
import React from "react";

function Content({ isSidebarOpen, activeMenu }) {
    const menuItems = [
        "Beranda",
        "Profil", // Tidak digunakan karena Profil ditangani oleh ContentProfile
        "Pesan",
        "Notifikasi",
        "Pencarian",
        "Pengaturan",
    ];

    return (
        <div
            className={`flex-1 p-6 transition-all duration-300 ${
                isSidebarOpen ? "md:ml-64" : "md:ml-16"
            }`}
        >
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-sky-900">
                    {menuItems[activeMenu]}
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

            {activeMenu === 0 && (
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md border border-sky-100/30">
                    <h2 className="text-xl font-bold text-sky-900 mb-4">
                        Beranda
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md border border-sky-100/30">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-sky-600">
                                        Total Pengguna
                                    </p>
                                    <h2 className="text-2xl font-bold text-sky-900">
                                        1.234
                                    </h2>
                                </div>
                                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-sky-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md border border-sky-100/30">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-sky-600">
                                        Pesan
                                    </p>
                                    <h2 className="text-2xl font-bold text-sky-900">
                                        456
                                    </h2>
                                </div>
                                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-sky-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md border border-sky-100/30">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-sky-600">
                                        Notifikasi
                                    </p>
                                    <h2 className="text-2xl font-bold text-sky-900">
                                        78
                                    </h2>
                                </div>
                                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-sky-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 17h5l-5 5-5-5h5zm0 0V7a7.5 7.5 0 00-15 0v10.001l2.999-.001"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md border border-sky-100/30">
                        <h2 className="text-xl font-bold text-sky-900 mb-4">
                            Aktivitas Terbaru
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-sm text-sky-600 border-b border-sky-200">
                                        <th className="py-3 px-4">Pengguna</th>
                                        <th className="py-3 px-4">Aksi</th>
                                        <th className="py-3 px-4">Tanggal</th>
                                        <th className="py-3 px-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        {
                                            user: "Alice Smith",
                                            action: "Mengirim pesan",
                                            date: "2025-08-01",
                                            status: "Selesai",
                                        },
                                        {
                                            user: "Bob Johnson",
                                            action: "Memperbarui profil",
                                            date: "2025-07-31",
                                            status: "Menunggu",
                                        },
                                        {
                                            user: "Charlie Brown",
                                            action: "Masuk",
                                            date: "2025-07-30",
                                            status: "Selesai",
                                        },
                                    ].map((item, index) => (
                                        <tr
                                            key={index}
                                            className="text-sm text-sky-800 border-b border-sky-100/50 hover:bg-sky-50/50"
                                        >
                                            <td className="py-3 px-4">
                                                {item.user}
                                            </td>
                                            <td className="py-3 px-4">
                                                {item.action}
                                            </td>
                                            <td className="py-3 px-4">
                                                {item.date}
                                            </td>
                                            <td className="py-3 px-4">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs ${
                                                        item.status ===
                                                        "Selesai"
                                                            ? "bg-green-100 text-green-600"
                                                            : "bg-yellow-100 text-yellow-600"
                                                    }`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {activeMenu === 2 && (
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md border border-sky-100/30">
                    <h2 className="text-xl font-bold text-sky-900 mb-4">
                        Daftar Pesan
                    </h2>
                    <div className="space-y-4">
                        {[
                            {
                                sender: "Alice",
                                message: "Hai, ada update baru?",
                                time: "08:00",
                            },
                            {
                                sender: "Bob",
                                message: "Laporan sudah dikirim.",
                                time: "07:30",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center p-4 bg-sky-50/50 rounded-lg border border-sky-100/30"
                            >
                                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center mr-4">
                                    <svg
                                        className="w-6 h-6 text-sky-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                        />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-sky-900">
                                        {item.sender}
                                    </p>
                                    <p className="text-sm text-sky-600">
                                        {item.message}
                                    </p>
                                </div>
                                <p className="text-xs text-sky-500">
                                    {item.time}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeMenu === 3 && (
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md border border-sky-100/30">
                    <h2 className="text-xl font-bold text-sky-900 mb-4">
                        Notifikasi
                    </h2>
                    <div className="space-y-4">
                        {[
                            {
                                message: "Pengguna baru terdaftar.",
                                time: "08:00",
                            },
                            { message: "Sistem diperbarui.", time: "07:00" },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center p-4 bg-sky-50/50 rounded-lg border border-sky-100/30"
                            >
                                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center mr-4">
                                    <svg
                                        className="w-6 h-6 text-sky-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 17h5l-5 5-5-5h5zm0 0V7a7.5 7.5 0 00-15 0v10.001l2.999-.001"
                                        />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-sky-600">
                                        {item.message}
                                    </p>
                                </div>
                                <p className="text-xs text-sky-500">
                                    {item.time}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeMenu === 4 && (
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md border border-sky-100/30">
                    <h2 className="text-xl font-bold text-sky-900 mb-4">
                        Pencarian
                    </h2>
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Cari pengguna, pesan, atau notifikasi..."
                            className="w-full p-3 rounded-lg bg-white/80 border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
                        />
                    </div>
                    <p className="text-sm text-sky-600">
                        Hasil pencarian akan muncul di sini.
                    </p>
                </div>
            )}

            {activeMenu === 5 && (
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md border border-sky-100/30">
                    <h2 className="text-xl font-bold text-sky-900 mb-4">
                        Pengaturan
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-medium text-sky-900">
                                Tema
                            </h3>
                            <select className="w-full p-2 rounded-lg bg-white/80 border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400">
                                <option>Tema Terang</option>
                                <option>Tema Gelap</option>
                            </select>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-sky-900">
                                Bahasa
                            </h3>
                            <select className="w-full p-2 rounded-lg bg-white/80 border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400">
                                <option>Indonesia</option>
                                <option>Inggris</option>
                            </select>
                        </div>
                        <button className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors">
                            Simpan Pengaturan
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Content;
