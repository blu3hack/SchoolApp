import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {" "}
            {/* Added flex-col for better layout control */}
            <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
                {" "}
                {/* Added shadow-sm, sticky, top-0, z-50 */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {" "}
                        {/* Added items-center */}
                        <div className="flex items-center">
                            {" "}
                            {/* Added items-center for vertical alignment */}
                            {/* Logo */}
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-blue-600 hover:text-blue-800 transition-colors duration-200" />{" "}
                                    {/* Changed logo color */}
                                </Link>
                            </div>
                            {/* Navigation Links (Desktop) */}
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                {" "}
                                {/* Changed ms-10 to ml-10 */}
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                    className="text-gray-600 hover:text-gray-900 focus:text-gray-900 border-b-2 border-transparent hover:border-blue-500 focus:border-blue-500 transition-colors duration-200" // Added hover/focus effects
                                >
                                    Dashboard
                                </NavLink>
                                {/* Add more desktop NavLinks here if needed */}
                                <NavLink
                                    href={route("profile.edit")} // Example: Link to profile
                                    active={route().current("profile.edit")}
                                    className="text-gray-600 hover:text-gray-900 focus:text-gray-900 border-b-2 border-transparent hover:border-blue-500 focus:border-blue-500 transition-colors duration-200"
                                >
                                    Profile
                                </NavLink>
                            </div>
                        </div>
                        {/* Settings Dropdown (Desktop) */}
                        <div className="hidden sm:ml-6 sm:flex sm:items-center">
                            {" "}
                            {/* Changed ms-6 to ml-6 */}
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-full border border-transparent bg-white px-4 py-2 text-sm font-medium leading-4 text-gray-700 transition duration-200 ease-in-out hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" // More prominent button style
                                    >
                                        <img
                                            src={
                                                user.profile_photo_url ||
                                                `https://ui-avatars.com/api/?name=${user.Nama}&color=7F9CF5&background=EBF4FF`
                                            }
                                            alt={user.name}
                                            className="h-8 w-8 rounded-full object-cover mr-2 border border-gray-200" // Added profile picture
                                        />
                                        {user.name}
                                        <svg
                                            className="-mr-0.5 ml-2 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link
                                        href={route("profile.edit")}
                                        className="text-gray-700 hover:bg-gray-100 px-4 py-2 flex items-center" // Added flex for icon
                                    >
                                        <svg
                                            className="h-5 w-5 mr-2 text-gray-500"
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
                                        </svg>
                                        Pengaturan Profil
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="text-gray-700 hover:bg-gray-100 px-4 py-2 flex items-center"
                                    >
                                        <svg
                                            className="h-5 w-5 mr-2 text-gray-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                            />
                                        </svg>
                                        Keluar
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                        {/* Hamburger */}
                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-700 transition duration-150 ease-in-out"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Responsive Navigation */}
                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        {/* Add more responsive NavLinks here if needed */}
                        <ResponsiveNavLink
                            href={route("profile.edit")}
                            active={route().current("profile.edit")}
                        >
                            Profile
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="flex items-center px-4">
                            <div className="shrink-0 mr-3">
                                <img
                                    src={
                                        user.profile_photo_url ||
                                        `https://ui-avatars.com/api/?name=${user.name}&color=7F9CF5&background=EBF4FF`
                                    }
                                    alt={user.name}
                                    className="h-10 w-10 rounded-full object-cover border border-gray-200"
                                />
                            </div>
                            <div>
                                <div className="font-medium text-base text-gray-800">
                                    {user.name}
                                </div>
                                <div className="font-medium text-sm text-gray-500">
                                    {user.email}
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Pengaturan Profil
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Keluar
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>
            {header && (
                <header className="bg-white shadow-md">
                    {" "}
                    {/* Stronger shadow for header */}
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}
            <main className="flex-grow">
                {" "}
                {/* Allows main content to grow and push footer down if there is one */}
                {children}
            </main>
        </div>
    );
}
