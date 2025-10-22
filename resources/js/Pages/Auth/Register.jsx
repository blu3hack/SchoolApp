import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            {/* Welcome SVG Illustration */}
            <div className="flex justify-center mb-8">
                <svg
                    width="120"
                    height="120"
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-emerald-600"
                >
                    {/* Background Circle */}
                    <circle
                        cx="100"
                        cy="100"
                        r="90"
                        fill="url(#gradient)"
                        fillOpacity="0.1"
                    />

                    {/* User Icon Base */}
                    <circle
                        cx="100"
                        cy="80"
                        r="25"
                        fill="currentColor"
                        fillOpacity="0.8"
                    />

                    {/* User Body */}
                    <path
                        d="M100 110C75 110 55 125 55 145V160H145V145C145 125 125 110 100 110Z"
                        fill="currentColor"
                        fillOpacity="0.8"
                    />

                    {/* Plus Icon (Add User) */}
                    <circle
                        cx="140"
                        cy="60"
                        r="20"
                        fill="white"
                        stroke="currentColor"
                        strokeWidth="3"
                    />
                    <path
                        d="M140 50V70M130 60H150"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />

                    {/* Decorative Elements */}
                    <circle
                        cx="60"
                        cy="50"
                        r="3"
                        fill="currentColor"
                        fillOpacity="0.3"
                    />
                    <circle
                        cx="150"
                        cy="130"
                        r="2"
                        fill="currentColor"
                        fillOpacity="0.4"
                    />
                    <circle
                        cx="40"
                        cy="120"
                        r="4"
                        fill="currentColor"
                        fillOpacity="0.2"
                    />
                    <circle
                        cx="160"
                        cy="150"
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
                            <stop offset="100%" stopColor="rgb(16, 185, 129)" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Welcome Text */}
            <div className="text-center mb-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Buat Akun
                </h2>
            </div>

            <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
                <form onSubmit={submit} className="space-y-6">
                    <div className="relative">
                        <InputLabel
                            htmlFor="name"
                            value="Nama"
                            className="text-gray-700 font-medium"
                        />

                        <div className="relative mt-2">
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                                placeholder="Masukkan Nama Anda"
                            />
                            {/* User Icon */}
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
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                        </div>

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="relative">
                        <InputLabel
                            htmlFor="username"
                            value="Username"
                            className="text-gray-700 font-medium"
                        />

                        <div className="relative mt-2">
                            <TextInput
                                id="username"
                                name="username"
                                value={data.username}
                                className="mt-1 block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("username", e.target.value)
                                }
                                required
                                placeholder="Buat Username"
                            />
                            {/* User Icon */}
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
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                        </div>

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="relative">
                        <InputLabel
                            htmlFor="email"
                            value="Email"
                            className="text-gray-700 font-medium"
                        />

                        <div className="relative mt-2">
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                                autoComplete="username"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                                placeholder="Daftarkan Email"
                            />
                            {/* Email Icon */}
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

                        <InputError message={errors.email} className="mt-2" />
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
                                className="mt-1 block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                                placeholder="Atur Password Anda"
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

                    <div className="relative">
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirm Password"
                            className="text-gray-700 font-medium"
                        />

                        <div className="relative mt-2">
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                required
                                placeholder="Ulangi Password"
                            />
                            {/* Confirm Password Icon */}
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
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                        </div>

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-8 flex items-center justify-between">
                        <Link
                            href={route("login")}
                            className="text-sm text-emerald-600 hover:text-emerald-800 underline font-medium transition-colors duration-200 hover:underline-offset-4"
                        >
                            Login
                        </Link>

                        <PrimaryButton
                            className="ms-4 px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 focus:ring-4 focus:ring-emerald-200 transform hover:scale-105 transition-all duration-200 shadow-lg rounded-xl font-semibold"
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
                                    Creating Account...
                                </div>
                            ) : (
                                "Buat Akun"
                            )}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
