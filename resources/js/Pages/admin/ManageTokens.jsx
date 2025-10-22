import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";

function ManageTokens() {
    const { users } = usePage().props;
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // <-- state search

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedUsers(users.map((user) => user.id));
        } else {
            setSelectedUsers([]);
        }
    };

    const handleSelectUser = (userId) => {
        setSelectedUsers((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    };

    const handleDeleteSelected = () => {
        if (selectedUsers.length > 0) {
            if (confirm(`Yakin hapus ${selectedUsers.length} user?`)) {
                router.delete(route("users.delete.multiple"), {
                    data: { ids: selectedUsers }, // kirim array id ke backend
                    onSuccess: () => {
                        alert("User berhasil dihapus!");
                    },
                });
            }
        } else {
            alert("Pilih minimal 1 user untuk dihapus.");
        }
    };

    const getRoleBadgeColor = (role) => {
        switch (role?.toLowerCase()) {
            case "admin":
                return "bg-red-100 text-red-800";
            case "teacher":
            case "guru":
                return "bg-blue-100 text-blue-800";
            case "student":
            case "siswa":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const handleSearchUsers = (e) => {
        e.preventDefault();

        router.get(
            route("manage-token"), // route Laravel untuk menampilkan user
            { search: searchTerm }, // kirim query string ?search=xxx
            { preserveState: true } // supaya input search tetap muncul
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-2">
                        Manage Token
                    </h1>
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
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="px-4 py-2 w-64 text-slate-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            />
                        </form>
                    </div>
                </div>
                {/* Form Pencarian  */}

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                    {selectedUsers.length > 0 && (
                        <div className="bg-gradient-to-r from-red-50 to-pink-50 border-b border-red-100 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <span className="text-red-700 font-semibold">
                                        {selectedUsers.length} user(s) selected
                                    </span>
                                </div>
                                <button
                                    onClick={handleDeleteSelected}
                                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
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
                                            strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                    <span>Delete Selected</span>
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gradient-to-r from-slate-50 to-blue-50">
                                <tr>
                                    <th className="px-4 py-6 text-center">
                                        <input
                                            type="checkbox"
                                            onChange={handleSelectAll}
                                            checked={
                                                selectedUsers.length ===
                                                    users.length &&
                                                users.length > 0
                                            }
                                        />
                                    </th>
                                    <th className="px-8 py-6 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th className="px-8 py-6 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        UNIX ID
                                    </th>
                                    <th className="px-8 py-6 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        Full Name
                                    </th>
                                    <th className="px-8 py-6 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        Token
                                    </th>
                                    <th className="px-8 py-6 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        Kelas
                                    </th>
                                    <th className="px-8 py-6 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        Ebook
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-slate-50/50 transition-all duration-300 group"
                                    >
                                        <td className="px-4 py-6 text-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedUsers.includes(
                                                    user.id
                                                )}
                                                onChange={() =>
                                                    handleSelectUser(user.id)
                                                }
                                            />
                                        </td>
                                        <td className="px-8 py-6 whitespace-nowrap">
                                            <span className="text-sm font-semibold text-slate-900 bg-slate-100 px-3 py-1 rounded-full">
                                                #{user.id}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                    <div className="text-sm font-semibold text-slate-900">
                                                        {user.unique_char}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 whitespace-nowrap">
                                            <div className="text-sm font-medium text-slate-900">
                                                {user.name || "-"}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 whitespace-nowrap">
                                            <div className="text-sm text-slate-600 font-medium">
                                                {user.token || "-"}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 whitespace-nowrap">
                                            <div className="text-sm text-slate-600 font-medium">
                                                {user.kelas || "-"}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 whitespace-nowrap">
                                            <div className="text-sm text-slate-600 font-medium">
                                                {user.ebook || "-"}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageTokens;
