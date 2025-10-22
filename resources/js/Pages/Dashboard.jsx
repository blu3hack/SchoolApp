import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import { Link } from "@inertiajs/react";

export default function Dashboard({
    auth,
    totalUsers,
    totalEbooks,
    totalTokens,
}) {
    // State for controlling modal visibility

    // Dashboard statistics
    const dashboardStats = [
        {
            title: "Total Pengguna",
            value: totalUsers,
            gradient: "from-blue-500 to-blue-600",
            bgGradient: "from-blue-50 to-blue-100",
            icon: (
                <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a4 4 0 014-4h12a4 4 0 014 4v2H2z"
                    />
                </svg>
            ),
            description: "Pengguna terdaftar",
        },
        {
            title: "Total Ebooks",
            value: totalEbooks,
            gradient: "from-emerald-500 to-emerald-600",
            bgGradient: "from-emerald-50 to-emerald-100",
            icon: (
                <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                </svg>
            ),
            description: "Koleksi digital tersedia",
        },
        {
            title: "Total Token",
            value: totalTokens,
            gradient: "from-purple-500 to-purple-600",
            bgGradient: "from-purple-50 to-purple-100",
            icon: (
                <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                </svg>
            ),
            description: "Total Token Terdistribusi",
        },
        {
            title: "Versi",
            value: "Az-Eb.4.3",
            gradient: "from-amber-500 to-amber-600",
            bgGradient: "from-amber-50 to-amber-100",
            icon: (
                <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                </svg>
            ),
            description: "Versi aplikasi terkini",
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-4 sm:py-8 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Welcome Section */}
                    <div className="bg-white/80 backdrop-blur-sm overflow-hidden shadow-2xl rounded-2xl mb-6 sm:mb-8 p-4 sm:p-6 lg:p-8 border border-white/20 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl"></div>
                        <div className="relative flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                            <div className="relative">
                                <img
                                    src={
                                        auth.user.profile_photo_url ||
                                        `https://ui-avatars.com/api/?name=${auth.user.Nama}&color=7F9CF5&background=EBF4FF&bold=true&size=128`
                                    }
                                    alt={auth.user.name}
                                    className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover border-4 border-white shadow-xl ring-4 ring-blue-100"
                                />
                                <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-400 rounded-full border-2 border-white"></div>
                            </div>
                            <div className="text-center sm:text-left flex-1">
                                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                                    Selamat datang, {auth.user.Nama}! 👋
                                </h3>
                                <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                                    Semoga hari Anda produktif dan menyenangkan
                                    di platform kami.
                                </p>
                                <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border border-blue-200">
                                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                                    Status: Online
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Statistics Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                        {dashboardStats.map((stat, index) => (
                            <div
                                key={index}
                                className="group relative bg-white/90 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-xl border border-white/20 transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer overflow-hidden"
                            >
                                {/* Background gradient overlay */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-50 group-hover:opacity-70 transition-opacity duration-300`}
                                ></div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                                        <h3 className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                            {stat.title}
                                        </h3>
                                        <div
                                            className={`p-2 sm:p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                                        >
                                            {stat.icon}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                                            {typeof stat.value === "number"
                                                ? stat.value.toLocaleString(
                                                      "id-ID"
                                                  )
                                                : stat.value}
                                        </p>
                                        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                                            {stat.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Decorative element */}
                                <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-tr from-transparent via-white/10 to-white/20 rounded-full transform rotate-45 group-hover:scale-110 transition-transform duration-300"></div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Actions Section */}
                    <div className="bg-white/90 backdrop-blur-sm overflow-hidden shadow-2xl rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-2xl"></div>
                        <div className="relative z-10">
                            <div className="flex items-center mb-4 sm:mb-6">
                                <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl mr-4 shadow-lg">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                                        Aksi Cepat
                                    </h3>
                                    <p className="text-gray-600 text-sm sm:text-base">
                                        Akses fitur utama dengan mudah
                                    </p>
                                </div>
                            </div>

                            {auth.user.role === "Siswa" ? (
                                <div className="max-w-md">
                                    <a
                                        href="/ClassEbook"
                                        className="group flex items-center justify-center p-4 sm:p-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-2xl shadow-xl hover:shadow-2xl text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                                        <svg
                                            className="w-6 h-6 mr-3 relative z-10"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                            />
                                        </svg>
                                        <span className="relative z-10 text-base sm:text-lg">
                                            Menuju Ebook
                                        </span>
                                        <svg
                                            className="w-5 h-5 ml-2 relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                    <a
                                        href="add-user"
                                        className="group flex items-center justify-center p-4 sm:p-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-2xl shadow-xl hover:shadow-2xl text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                                        <svg
                                            className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 relative z-10"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            />
                                        </svg>
                                        <span className="relative z-10 text-sm sm:text-base">
                                            Add Users
                                        </span>
                                    </a>

                                    <a
                                        href="add-token"
                                        className="group flex items-center justify-center p-4 sm:p-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-2xl shadow-xl hover:shadow-2xl text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                                        <svg
                                            className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 relative z-10"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                        <span className="relative z-10 text-sm sm:text-base">
                                            Add Token
                                        </span>
                                    </a>

                                    <Link
                                        href={route("add-users")}
                                        className="group flex items-center justify-center p-4 sm:p-6 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 rounded-2xl shadow-xl hover:shadow-2xl text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                                        <svg
                                            className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 relative z-10"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                        <span className="relative z-10 text-sm sm:text-base whitespace-nowrap">
                                            Admin Panel Ebook
                                        </span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
