// resources/js/Components/admin/AdminNavbar.jsx
import React from "react";

const HomeIcon = () => (
    <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
    </svg>
);

const UserIcon = () => (
    <svg
        className="w-5 h-5"
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
);

const MessageIcon = () => (
    <svg
        className="w-5 h-5"
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
);

const MenuIcon = () => (
    <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
        />
    </svg>
);

const CloseIcon = () => (
    <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
        />
    </svg>
);

function AdminNavbar({ isOpen, setIsOpen, activeMenu, setActiveMenu }) {
    const toggleNavbar = () => {
        console.log("Toggle sidebar:", !isOpen); // Debugging
        setIsOpen(!isOpen);
    };

    const menuItems = [
        { Icon: HomeIcon, label: "Beranda" },
        { Icon: UserIcon, label: "Profil" },
        { Icon: MessageIcon, label: "Pesan" },
    ];

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-sky-900 bg-opacity-30 z-40"
                    onClick={toggleNavbar}
                />
            )}
            <div
                className={`fixed left-0 top-0 h-full bg-white/10 backdrop-blur-lg border-r border-sky-100/30 text-gray-800 shadow-lg z-50 transition-all duration-300 ease-in-out ${
                    isOpen ? "w-64" : "w-16"
                }`}
            >
                <div className="flex items-center justify-between p-4 border-b border-sky-100/20">
                    <div
                        className={`font-bold text-xl text-sky-900 transition-opacity duration-300 ${
                            isOpen ? "opacity-100" : "opacity-0 w-0"
                        }`}
                    >
                        Dashboard
                    </div>
                    <button
                        onClick={toggleNavbar}
                        className="p-2 rounded-full hover:bg-sky-100/30 text-sky-700 transition-colors duration-200"
                    >
                        {isOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>
                <nav className="mt-6">
                    <ul className="space-y-2 px-3">
                        {menuItems.map((item, index) => {
                            const { Icon } = item;
                            const isActive = activeMenu === index;
                            return (
                                <li key={index}>
                                    <button
                                        onClick={() => {
                                            console.log("Menu diklik:", index); // Debugging
                                            setActiveMenu(index);
                                        }}
                                        className={`w-full flex items-center px-3 py-3 rounded-xl transition-all duration-200 group relative ${
                                            isActive
                                                ? "bg-gradient-to-r from-sky-200/50 to-sky-300/50 text-sky-600"
                                                : "hover:bg-sky-100/20 text-sky-600 hover:text-sky-900"
                                        }`}
                                    >
                                        <div
                                            className={`${
                                                isOpen ? "mr-3" : "mx-auto"
                                            }`}
                                        >
                                            <Icon />
                                        </div>
                                        <span
                                            className={`font-medium transition-all duration-300 ${
                                                isOpen
                                                    ? "opacity-100 translate-x-0"
                                                    : "opacity-0 -translate-x-4 absolute"
                                            }`}
                                        >
                                            {item.label}
                                        </span>
                                        {!isOpen && (
                                            <div className="absolute left-16 px-3 py-1 bg-white/90 backdrop-blur-md text-sky-800 text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-60">
                                                {item.label}
                                                <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 border-4 border-transparent border-r-white/90" />
                                            </div>
                                        )}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default AdminNavbar;
