// src/components/Dashboard.js
import { usePage } from "@inertiajs/react";
import Sidebar from "./component/Sidebar";
import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { showAlert } from "./js/UsersHandling";
import EbooksFormModal from "./component/ModalAddEbooks";
import PanelsFormModal from "./component/ModalAddPanels";

function AddPanels() {
    const { users } = usePage().props;
    const [openStore, setIsStore] = useState(false); // <-- state input form

    const { data, setData, post, put, progress, errors, reset } = useForm({
        Kelas: "",
        header: null,
        footer: null,
    });

    // Handle add user

    const isStoreHandle = (e) => {
        e.preventDefault();

        post(route("panels-store"), {
            forceFormData: true,
            onSuccess: () => {
                showAlert("Token berhasil di buat!");
                reset();
                setIsStore(false);
            },
        });
    };

    // Handle delete
    const handleDelete = (id) => {
        if (confirm("Yakin ingin menghapus user ini?")) {
            router.delete(route("panels.delete", id), {
                onSuccess: () => {
                    showAlert("User berhasil dihapus!");
                },
            });
        }
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            <Sidebar />
            <div className="flex flex-1 flex-col p-6">
                {/* <Header /> */}

                {/* Main Content */}
                <div className="mt-8 flex-1">
                    {/* Header Section */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Panels Management
                        </h1>
                    </div>

                    {/* Table Section */}
                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                        <div className="p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/10">
                            <div className="flex items-center justify-between">
                                {/* Form Pencarian  */}
                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={() => setIsStore(true)}
                                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        <svg
                                            className="w-4 h-4 inline mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 4v16m8-8H4"
                                            />
                                        </svg>
                                        Add Panels
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            {users.length > 0 ? (
                                <>
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-white/5 border-b border-white/10">
                                                <th className="border border-white/10 text-center px-6 py-4 text-sm font-semibold text-gray-200 uppercase tracking-wider">
                                                    No
                                                </th>
                                                <th className="border border-white/10 text-center px-6 py-4 text-sm font-semibold text-gray-200 uppercase tracking-wider">
                                                    Kelas
                                                </th>
                                                <th className="border border-white/10 text-center px-6 py-4 text-sm font-semibold text-gray-200 uppercase tracking-wider">
                                                    Header
                                                </th>
                                                <th className="border border-white/10 text-center px-6 py-4 text-sm font-semibold text-gray-200 uppercase tracking-wider">
                                                    Footer
                                                </th>
                                                <th className="border border-white/10 text-center px-6 py-4 text-sm font-semibold text-gray-200 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {users.map((user, index) => (
                                                <tr
                                                    key={user.id}
                                                    className="hover:bg-white/5 transition-all duration-200 group "
                                                >
                                                    <td className=" px-6 py-4 whitespace-nowrap flex justify-center items-center">
                                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold text-white">
                                                            {index + 1}
                                                        </div>
                                                    </td>

                                                    <td className="border border-white/10 px-6 py-4 whitespace-nowrap">
                                                        <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                                            {user.kelas}
                                                        </span>
                                                    </td>

                                                    <td className="border border-white/10 px-6 py-4 whitespace-nowrap">
                                                        <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                                            {user.header}
                                                        </span>
                                                    </td>

                                                    <td className="text-center border border-white/10 px-6 py-4 whitespace-nowrap">
                                                        <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                                            {user.footer}
                                                        </span>
                                                    </td>

                                                    <td className="border border-white/10 px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex justify-center space-x-2 group-hover:opacity-100 transition-opacity duration-200">
                                                            {/* action delete button */}
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        user.id
                                                                    )
                                                                }
                                                                className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/20 transition-all duration-200"
                                                            >
                                                                <svg
                                                                    className="w-4 h-4"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </>
                            ) : (
                                <div className="text-center py-16">
                                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                                        <svg
                                            className="w-12 h-12 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-300 mb-2">
                                        No Users Found
                                    </h3>
                                    <p className="text-gray-400 mb-6">
                                        There are currently no users in the
                                        system.
                                    </p>
                                    <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                        Add First User
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal upload  */}

            {/* Modal input form user */}

            <PanelsFormModal
                open={openStore}
                onClose={() => setIsStore(false)}
                onSubmit={isStoreHandle}
                data={data}
                setData={setData}
                errors={errors}
            />

            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
                .animate-shimmer {
                    animation: shimmer 2s infinite;
                }
            `}</style>
        </div>
    );
}

export default AddPanels;
