import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import React from "react"; // Make sure React is imported

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-display text-4xl sm:text-5xl leading-tight text-gray-900 tracking-tight drop-shadow-md text-center">
                    Pengaturan Akun Anda
                </h2>
            }
        >
            <Head title="Pengaturan Akun" />

            {/* Main content area with a more vibrant, subtle gradient background */}
            <div className="py-12 sm:py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen relative overflow-hidden">
                {/* Decorative background elements (optional, but adds flair) */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
                {/* End Decorative background elements */}

                <div className="max-w-6xl mx-auto space-y-10 sm:space-y-12 px-4 sm:px-6 lg:px-8 relative z-10">
                    {" "}
                    {/* Added relative z-10 */}
                    {/* Section: Informasi Pribadi */}
                    <SectionCard
                        title="Informasi Pribadi"
                        description="Perbarui detail akun dan alamat email Anda."
                        icon={
                            <svg
                                className="w-9 h-9 text-blue-600 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        }
                        borderColor="border-blue-300"
                        bgGradient="from-blue-50 to-white"
                    >
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-full lg:max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-inner border border-gray-100" // Nested form styling
                        />
                    </SectionCard>
                    {/* Section: Keamanan Akun */}
                    <SectionCard
                        title="Keamanan Akun"
                        description="Pastikan akun Anda aman dengan kata sandi yang kuat."
                        icon={
                            <svg
                                className="w-9 h-9 text-indigo-600 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 7a2 2 0 012 2v5a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2h6zM7 9H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2h-2m-4-2h.01"
                                />
                            </svg>
                        }
                        borderColor="border-indigo-300"
                        bgGradient="from-indigo-50 to-white"
                    >
                        <UpdatePasswordForm
                            className="max-w-full lg:max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-inner border border-gray-100" // Nested form styling
                        />
                    </SectionCard>
                    {/* Section: Hapus Akun */}
                    <SectionCard
                        title="Hapus Akun"
                        description="Tindakan ini tidak dapat dibatalkan. Harap berhati-hati."
                        icon={
                            <svg
                                className="w-9 h-9 text-red-600 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                        }
                        borderColor="border-red-300"
                        bgGradient="from-red-50 to-white"
                    >
                        <DeleteUserForm
                            className="max-w-full lg:max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-inner border border-gray-100" // Nested form styling
                        />
                    </SectionCard>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// --- Component Pembantu untuk Card Section ---
// Ini akan membuat struktur card lebih rapi dan reusable
const SectionCard = ({
    title,
    description,
    icon,
    children,
    borderColor,
    bgGradient,
}) => {
    return (
        <div
            className={`relative bg-gradient-to-br ${bgGradient} p-8 sm:p-10 rounded-3xl shadow-2xl border ${borderColor} backdrop-blur-sm overflow-hidden
                        transform transition-all duration-500 ease-in-out hover:scale-[1.005] hover:shadow-3xl
                        group`}
        >
            {" "}
            {/* Added group class */}
            {/* Background shape (modern touch) */}
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/30 rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/30 rounded-full -translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></div>
            <div className="flex items-start mb-6 relative z-10">
                {" "}
                {/* Z-index to keep content above decorative elements */}
                <div className="p-3 bg-white rounded-full shadow-lg mr-4 border border-gray-100 flex-shrink-0">
                    {icon}
                </div>
                <div>
                    <h3 className="font-bold text-3xl sm:text-4xl text-gray-800 leading-tight">
                        {title}
                    </h3>
                    <p className="text-gray-600 mt-2 text-lg">{description}</p>
                </div>
            </div>
            <div className="relative z-10">{children}</div>
        </div>
    );
};
