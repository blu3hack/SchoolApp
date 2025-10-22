import React from "react";

function ContentMessages({ isSidebarOpen }) {
    return (
        <div
            className={`flex-1 p-6 transition-all duration-300 ${
                isSidebarOpen ? "ml-64" : "ml-16"
            }`}
        >
            <h1 className="text-2xl font-bold text-sky-900 mb-4">Pesan</h1>
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md border border-sky-100/30">
                <p className="text-sky-600">Daftar pesan Anda:</p>
                <ul className="mt-2 space-y-2">
                    <li className="text-sky-600">
                        Pesan dari Alice: Hai, apa kabar?
                    </li>
                    <li className="text-sky-600">
                        Pesan dari Bob: Laporan selesai.
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ContentMessages;
