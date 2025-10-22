// src/components/Sidebar.js
import { useState } from "react";
import { usePage } from "@inertiajs/react";

function Sidebar() {
    const { auth } = usePage().props;
    const [isDataManagementOpen, setIsDataManagementOpen] = useState(false);

    return (
        <div className="flex w-64 flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-lg">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text p-6 text-3xl font-extrabold tracking-tight text-transparent">
                {auth.user.Nama}
            </div>
            <nav className="flex-1 p-4">
                <ul>
                    <li className="mb-3">
                        <a
                            href="/dashboard"
                            className="flex items-center rounded-lg p-3 backdrop-blur-md transition-all duration-300 hover:bg-white/10"
                        >
                            <svg
                                className="mr-3 h-6 w-6 text-blue-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            Dashboard
                        </a>
                    </li>
                    <li className="mb-3">
                        <a
                            href="/add-user"
                            className="flex items-center rounded-lg p-3 backdrop-blur-md transition-all duration-300 hover:bg-white/10"
                        >
                            <svg
                                className="mr-3 h-6 w-6 text-purple-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            Add Users
                        </a>
                    </li>
                    <li className="mb-3">
                        <a
                            href="/add-ebook"
                            className="flex items-center rounded-lg p-3 backdrop-blur-md transition-all duration-300 hover:bg-white/10"
                        >
                            <svg
                                className="mr-3 h-6 w-6 text-green-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 6.253v13.5m0-13.5c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5 7.5-3.358 7.5-7.5S16.142 6.253 12 6.253zM12 6.253V4a2 2 0 00-2-2H5a2 2 0 00-2 2v16a2 2 0 002 2h5a2 2 0 002-2v-2.253"
                                />
                            </svg>
                            Add Ebook
                        </a>
                    </li>
                    <li className="mb-3">
                        <a
                            href="add-token"
                            className="flex items-center rounded-lg p-3 backdrop-blur-md transition-all duration-300 hover:bg-white/10"
                        >
                            <svg
                                className="mr-3 h-6 w-6 text-yellow-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17.5 14.5a2.5 2.5 0 10-2.5 2.5 2.5 2.5 0 002.5-2.5zM12 6.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM6.5 14.5a2.5 2.5 0 10-2.5 2.5 2.5 2.5 0 002.5-2.5zM17.5 6.5a2.5 2.5 0 10-2.5 2.5 2.5 2.5 0 002.5-2.5zM12 18.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                                />
                            </svg>
                            Add Token
                        </a>
                    </li>
                    <li className="mb-3">
                        <a
                            href="add-panel"
                            className="flex items-center rounded-lg p-3 backdrop-blur-md transition-all duration-300 hover:bg-white/10"
                        >
                            <svg
                                className="mr-3 h-6 w-6 text-red-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                                />
                            </svg>
                            Add Panel
                        </a>
                    </li>
                    <li className="mb-3">
                        <button
                            onClick={() =>
                                setIsDataManagementOpen(!isDataManagementOpen)
                            }
                            className="flex w-full items-center rounded-lg p-3 backdrop-blur-md transition-all duration-300 hover:bg-white/10"
                        >
                            <svg
                                className="mr-3 h-6 w-6 text-pink-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 16v-6a2 2 0 012-2h2a2 2 0 012 2v6m0 0v-6a2 2 0 012-2h2a2 2 0 012 2v6m0 0v-6a2 2 0 012-2h2a2 2 0 012 2v6"
                                />
                            </svg>
                            <span className="flex-1 text-left">
                                Manage Data
                            </span>
                            <svg
                                className={`h-4 w-4 transition-transform duration-200 ${
                                    isDataManagementOpen ? "rotate-180" : ""
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>

                        {/* Sub-menu untuk Data Management */}
                        <div
                            className={`overflow-hidden transition-all duration-300 ${
                                isDataManagementOpen
                                    ? "max-h-96 opacity-100"
                                    : "max-h-0 opacity-0"
                            }`}
                        >
                            <ul className="ml-6 mt-2 space-y-2">
                                <li>
                                    <a
                                        href="/manage-user"
                                        className="flex items-center rounded-lg p-2 text-sm backdrop-blur-md transition-all duration-300 hover:bg-white/5"
                                    >
                                        <svg
                                            className="mr-2 h-4 w-4 text-cyan-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                        Manage Users
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/manage-token"
                                        className="flex items-center rounded-lg p-2 text-sm backdrop-blur-md transition-all duration-300 hover:bg-white/5"
                                    >
                                        <svg
                                            className="mr-2 h-4 w-4 text-orange-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                                            />
                                        </svg>
                                        Manage Token
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
