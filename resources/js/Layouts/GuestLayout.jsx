import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            {/* Kiri */}
            <div className="hidden items-center justify-center bg-gradient-to-br from-emerald-600 to-teal-700 p-8 lg:flex lg:w-1/2">
                <div className="max-w-md text-center text-white">
                    <div className="mb-8">
                        {/* Logo placeholder - in real app you'd use the actual logo */}
                        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center">
                            <img
                                src="/img/alazka-logo.png"
                                alt="Logo Alazka"
                                className="h-auto w-60 transform drop-shadow-xl filter transition-all duration-300 group-hover:scale-110"
                            />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-2xl leading-tight font-bold">
                            Selamat Datang di Portal E-Book
                        </h1>
                        <h2 className="text-xl font-semibold">
                            Al-Azhar Kelapa Gading Surabaya
                        </h2>
                        <p className="mt-6 rounded-lg bg-white/10 p-4 text-sm leading-relaxed italic">
                            "Allah akan meninggikan orang-orang yang beriman di
                            antaramu dan orang-orang yang diberi ilmu
                            pengetahuan beberapa derajat"
                            <br />
                            <span className="text-xs">
                                (QS. Al Mujadilah : 11)
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Kanan */}
            <div className="flex w-full md:w-1/2 items-center bg-transparent justify-center p-6">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}
