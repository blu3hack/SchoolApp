// src/components/Dashboard.js
import { usePage } from "@inertiajs/react";
import Sidebar from "./component/Sidebar";
import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { showAlert } from "./js/UsersHandling";
import EbooksFormModal from "./component/ModalAddEbooks";

function AddEbook() {
    const { users } = usePage().props;
    const [openStore, setIsStore] = useState(false); // <-- state input form
    const [searchTerm, setSearchTerm] = useState(""); // <-- state search

    const { data, setData, post, put, progress, errors, reset } = useForm({
        file: null,
        Author: "",
        Kelas: "",
        Ebook: "",
        File_pdf: null,
        cover: null,
    });

    // Handle add user

    const isStoreHandle = (e) => {
        e.preventDefault();

        post(route("ebooks-store"), {
            forceFormData: true,
            onSuccess: () => {
                showAlert("Token berhasil di buat!");
                reset();
                setIsStore(false);
            },
        });
    };

    // Handle seacrch
    const handleSearchUsers = (e) => {
        e.preventDefault();

        router.get(
            route("add-ebook"), // route Laravel untuk menampilkan user
            { search: searchTerm }, // kirim query string ?search=xxx
            { preserveState: true } // supaya input search tetap muncul
        );
    };

    // Handle delete
    const handleDelete = (id) => {
        if (confirm("Yakin ingin menghapus user ini?")) {
            router.delete(route("ebooks.delete", id), {
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
                            Ebooks Management
                        </h1>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-100 text-sm font-medium">
                                        Total Users
                                    </p>
                                    <p className="text-3xl font-bold text-white">
                                        {Number(users?.total ?? 0)}
                                    </p>
                                </div>
                                <div className="bg-blue-400 rounded-full p-3">
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
                                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-emerald-100 text-sm font-medium">
                                        Active Users
                                    </p>
                                    <p className="text-3xl font-bold text-white">
                                        {Number(users?.total ?? 0)}
                                    </p>
                                </div>
                                <div className="bg-emerald-400 rounded-full p-3">
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
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-purple-100 text-sm font-medium">
                                        New This Month
                                    </p>
                                    <p className="text-3xl font-bold text-white">
                                        {Math.floor(users.length * 0.3)}
                                    </p>
                                </div>
                                <div className="bg-purple-400 rounded-full p-3">
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
                                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                        <div className="p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/10">
                            <div className="flex items-center justify-between">
                                {/* Form Pencarian  */}
                                <div>
                                    <form
                                        onKeyUp={handleSearchUsers}
                                        className="flex items-center gap-2"
                                    >
                                        <input
                                            type="text"
                                            name="search_users"
                                            placeholder="Cari user..."
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                            className="px-4 py-2 w-64 text-slate-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                        />
                                    </form>
                                </div>
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
                                        Add Ebooks
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            {users.data.length > 0 ? (
                                <>
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-white/5 border-b border-white/10">
                                                <th className="border border-white/10 text-center px-6 py-4 text-sm font-semibold text-gray-200 uppercase tracking-wider">
                                                    No
                                                </th>
                                                <th className="border border-white/10 text-center px-6 py-4 text-sm font-semibold text-gray-200 uppercase tracking-wider">
                                                    MAPEL
                                                </th>
                                                <th className="border border-white/10 text-center px-6 py-4 text-sm font-semibold text-gray-200 uppercase tracking-wider">
                                                    Ebook
                                                </th>
                                                <th className="border border-white/10 text-center px-6 py-4 text-sm font-semibold text-gray-200 uppercase tracking-wider">
                                                    Author
                                                </th>
                                                <th className="border border-white/10 text-center px-6 py-4 text-sm font-semibold text-gray-200 uppercase tracking-wider">
                                                    Kelas
                                                </th>
                                                <th className="border border-white/10 text-center px-6 py-4 text-sm font-semibold text-gray-200 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {users.data.map((user, index) => (
                                                <tr
                                                    key={user.id}
                                                    className="hover:bg-white/5 transition-all duration-200 group "
                                                >
                                                    <td className=" px-6 py-4 whitespace-nowrap flex justify-center items-center">
                                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold text-white">
                                                            {(users.current_page -
                                                                1) *
                                                                users.per_page +
                                                                (index + 1)}
                                                        </div>
                                                    </td>

                                                    <td className="border border-white/10 px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                                                                {user.ebook
                                                                    ?.charAt(0)
                                                                    ?.toUpperCase() ||
                                                                    "U"}
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-medium text-white">
                                                                    {user.ebook}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="border border-white/10 px-6 py-4 whitespace-nowrap">
                                                        <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                                            {user.file_pdf}
                                                        </span>
                                                    </td>

                                                    <td className="border border-white/10 px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                                                                {user.author
                                                                    ?.charAt(0)
                                                                    ?.toUpperCase() ||
                                                                    "U"}
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-medium text-white">
                                                                    {
                                                                        user.author
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="text-center border border-white/10 px-6 py-4 whitespace-nowrap">
                                                        <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                                            {user.kelas}
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
                                    <div className="flex justify-center mt-4 space-x-2">
                                        {users.links.map((link, i) => (
                                            <button
                                                key={i}
                                                disabled={!link.url}
                                                onClick={() =>
                                                    link.url &&
                                                    router.get(link.url)
                                                }
                                                className={`px-3 py-1 rounded ${
                                                    link.active
                                                        ? "bg-blue-500 text-white"
                                                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                                }`}
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        ))}
                                    </div>
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

            <EbooksFormModal
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

export default AddEbook;
