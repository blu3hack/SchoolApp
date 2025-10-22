import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {/* Welcome SVG Illustration */}
            <div className="flex justify-center mb-8">
                <svg
                    width="120"
                    height="120"
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-indigo-600"
                >
                    {/* Background Circle */}
                    <circle
                        cx="100"
                        cy="100"
                        r="90"
                        fill="url(#gradient)"
                        fillOpacity="0.1"
                    />

                    {/* Lock Body */}
                    <rect
                        x="70"
                        y="110"
                        width="60"
                        height="50"
                        rx="8"
                        fill="currentColor"
                        fillOpacity="0.8"
                    />

                    {/* Lock Shackle */}
                    <path
                        d="M80 110V85C80 73.954 88.954 65 100 65C111.046 65 120 73.954 120 85V110"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeLinecap="round"
                        fill="none"
                    />

                    {/* Keyhole */}
                    <circle cx="100" cy="130" r="6" fill="white" />
                    <rect x="98" y="130" width="4" height="15" fill="white" />

                    {/* Decorative Elements */}
                    <circle
                        cx="60"
                        cy="60"
                        r="3"
                        fill="currentColor"
                        fillOpacity="0.3"
                    />
                    <circle
                        cx="140"
                        cy="70"
                        r="2"
                        fill="currentColor"
                        fillOpacity="0.4"
                    />
                    <circle
                        cx="150"
                        cy="140"
                        r="4"
                        fill="currentColor"
                        fillOpacity="0.2"
                    />
                    <circle
                        cx="50"
                        cy="130"
                        r="2"
                        fill="currentColor"
                        fillOpacity="0.3"
                    />

                    {/* Gradient Definition */}
                    <defs>
                        <linearGradient
                            id="gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                        >
                            <stop offset="0%" stopColor="currentColor" />
                            <stop offset="100%" stopColor="rgb(99, 102, 241)" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Welcome Text */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                    Welcome Back
                </h2>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-lg p-3">
                    {status}
                </div>
            )}

            <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
                <form onSubmit={submit} className="space-y-6">
                    <div className="relative">
                        <InputLabel
                            htmlFor="username"
                            value="username"
                            className="text-gray-700 font-medium"
                        />

                        <div className="relative mt-2">
                            <TextInput
                                id="username"
                                type="username"
                                name="username"
                                value={data.username}
                                className="mt-1 block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("username", e.target.value)
                                }
                                placeholder="Enter your username"
                            />
                            {/* username Icon */}
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                    />
                                </svg>
                            </div>
                        </div>

                        <InputError
                            message={errors.username}
                            className="mt-2"
                        />
                    </div>

                    <div className="relative">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="text-gray-700 font-medium"
                        />

                        <div className="relative mt-2">
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                placeholder="Enter your password"
                            />
                            {/* Password Icon */}
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            </div>
                        </div>

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-8 flex items-center justify-between">
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="text-sm text-indigo-600 hover:text-indigo-800 underline font-medium transition-colors duration-200 hover:underline-offset-4"
                            ></Link>
                        )}

                        <PrimaryButton
                            className="ms-4 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-200 transform hover:scale-105 transition-all duration-200 shadow-lg rounded-xl font-semibold"
                            disabled={processing}
                        >
                            {processing ? (
                                <div className="flex items-center">
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Signing in...
                                </div>
                            ) : (
                                "Sign In"
                            )}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
