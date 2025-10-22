import React from "react";

function ContentHome({ isSidebarOpen }) {
    const user = { name: "Pengguna" }; // In a real app, this would come from an auth context or prop

    return (
        <div
            className={`flex-1 p-8 transition-all duration-300 ${
                isSidebarOpen ? "ml-64" : "ml-16"
            } bg-gray-100 min-h-screen`}
        >
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">
                    Selamat Datang, {user.name}!
                </h1>
                <span className="text-xl text-gray-500">
                    {new Date().toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </span>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-2xl border border-blue-100 transform transition-all duration-500 hover:scale-[1.005]">
                <p className="text-xl text-blue-800 font-semibold mb-4 leading-relaxed">
                    Anda berada di halaman Beranda. Ini adalah titik awal Anda
                    untuk mengelola semua aspek penting dari aplikasi Anda.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                    Lihat ringkasan aktivitas terbaru atau navigasikan melalui
                    menu di sisi kiri untuk detail lebih lanjut.
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 ease-in-out transform hover:scale-105">
                    Mulai Kelola Data Anda
                </button>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Example quick info cards */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100 flex items-center justify-between hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                    <div>
                        <p className="text-green-600 text-sm font-semibold">
                            Total Pengguna
                        </p>
                        <p className="text-3xl font-bold text-green-800 mt-1">
                            1,234
                        </p>
                    </div>
                    <svg
                        className="h-10 w-10 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a4 4 0 014-4h12a4 4 0 014 4v2H2z"
                        />
                    </svg>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100 flex items-center justify-between hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                    <div>
                        <p className="text-purple-600 text-sm font-semibold">
                            Produk Aktif
                        </p>
                        <p className="text-3xl font-bold text-purple-800 mt-1">
                            567
                        </p>
                    </div>
                    <svg
                        className="h-10 w-10 text-purple-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                    </svg>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-orange-100 flex items-center justify-between hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                    <div>
                        <p className="text-orange-600 text-sm font-semibold">
                            Pesanan Baru
                        </p>
                        <p className="text-3xl font-bold text-orange-800 mt-1">
                            89
                        </p>
                    </div>
                    <svg
                        className="h-10 w-10 text-orange-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default ContentHome;
