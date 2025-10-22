import { Link } from "@inertiajs/react";
import React from "react";

export default function Welcome({
    auth,
    laravelVersion = "11.x",
    phpVersion = "8.3",
}) {
    return (
        <div className="relative min-h-screen overflow-hidden bg-white text-gray-800 antialiased dark:bg-gray-950">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0 bg-gray-50 dark:bg-gray-900">
                {/* Removed blob animation for a cleaner look */}
            </div>

            {/* Main Content */}
            <main className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 py-2 sm:py-24 lg:py-10">
                <div className="text-center">
                    {/* Hero Section */}
                    <div className="group relative mb-1 transform overflow-hidden rounded-3xl border border-gray-200 bg-white p-1 shadow-lg backdrop-blur-lg dark:border-gray-700 dark:bg-gray-800">
                        {/* Logo */}
                        <div className="mb-8 flex justify-center">
                            <div className="group relative">
                                <img
                                    src="/img/alazka-logo.png"
                                    alt="Logo Alazka"
                                    className="h-auto w-32 transform drop-shadow-xl filter transition-all duration-300"
                                />
                            </div>
                        </div>

                        {/* Title & Subtitle */}
                        <h1 className="animate-fade-in mb-4 bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-center text-4xl font-bold text-transparent dark:from-gray-300 dark:to-gray-100">
                            Welcome to Alazka Ebook
                        </h1>
                        <p className="mx-auto mb-8 max-w-md text-center text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                            <span className="block">
                                Platform Interaktif Penunjang
                            </span>
                            <span className="mt-1 inline-block transform font-semibold text-gray-700 transition-transform duration-200 dark:text-gray-300">
                                Skills dan Pembelajaran
                            </span>
                        </p>

                        {/* Login Button */}
                        <div className="flex justify-center">
                            <Link
                                href="/login"
                                className="group relative transform overflow-hidden rounded-xl bg-gray-800 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 dark:bg-gray-200 dark:text-gray-800"
                            >
                                <span className="relative flex items-center gap-2">
                                    Login
                                    <svg
                                        className="h-4 w-4 transform transition-transform duration-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 translate-x-[-100%] -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700"></div>
                            </Link>
                        </div>

                        {/* Features Section */}
                        <div className="mt-16 grid gap-8 md:grid-cols-3">
                            {/* Card 1 */}
                            <FeatureCard
                                color="gray"
                                title="Cepat & Efisien"
                                description="Teknologi terdepan dengan optimisasi maksimal untuk memberikan performa luar biasa dalam setiap interaksi."
                                iconPath="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                            {/* Card 2 */}
                            <FeatureCard
                                color="gray"
                                title="100% Terpercaya"
                                description="Keamanan tingkat enterprise dengan enkripsi end-to-end menjamin data Anda selalu aman dan terlindungi."
                                iconPath="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                            {/* Card 3 */}
                            <FeatureCard
                                color="gray"
                                title="Intuitif & Mudah"
                                description="Desain yang memukau dengan UX yang sempurna, memungkinkan siapa saja langsung produktif."
                                iconPath="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

// FeatureCard Component
const FeatureCard = ({ color, title, description, iconPath }) => (
    <div
        className={`group relative transform overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-500 backdrop-blur-md dark:border-gray-700 dark:bg-gray-800`}
    >
        <div className="relative z-10">
            <div
                className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-gray-800 shadow-lg transition-all duration-300 dark:bg-gray-700 dark:text-gray-200`}
            >
                <svg
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={iconPath}
                    />
                </svg>
            </div>
            <h3
                className={`mb-4 text-2xl font-bold text-gray-900 transition-colors duration-300 dark:text-white`}
            >
                {title}
            </h3>
            <p className="leading-relaxed text-gray-600 transition-colors duration-300 dark:text-gray-400">
                {description}
            </p>
        </div>
    </div>
);
