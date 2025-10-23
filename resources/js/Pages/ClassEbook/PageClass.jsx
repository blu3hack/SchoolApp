import React, { useState, useEffect } from "react";
import { usePage, useForm } from "@inertiajs/react";
import {
    X,
    Book,
    User,
    GraduationCap,
    Key,
    Sparkles,
    AlertCircle,
    RefreshCw,
} from "lucide-react";
import { showAlert } from "../admin/js/UsersHandling";

function PageClass() {
    const { props } = usePage();
    const ebooks = props.ebooks || [];
    const userClass = props.class;
    const usersID = props.usersID;
    const [selectedEbook, setSelectedEbook] = useState(null);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    // Inisialisasi form
    const { data, setData, post, processing, errors } = useForm({
        token: "",
        file_pdf: "",
        id_nama: usersID || "", // default dari props
    });

    // Update file_pdf setiap kali selectedEbook berubah
    useEffect(() => {
        if (selectedEbook) {
            setData("file_pdf", selectedEbook.file_pdf || "");
            setData("id_nama", usersID || "");
        }
    }, [selectedEbook]);

    // Show/hide error alert
    useEffect(() => {
        if (errors.token) {
            setShowErrorAlert(true);
        }
    }, [errors.token]);

    const handleSubmit = (e) => {
        e.preventDefault();

        post("/ClassEbook", {
            onSuccess: () => {
                // Reset token setelah berhasil, tetap pertahankan selectedEbook
                setData("token", "");
                setShowErrorAlert(false);
            },
            onError: (errors) => {
                console.log("Validation errors:", errors);
            },
        });
    };

    const closeErrorAlert = () => {
        setShowErrorAlert(false);
    };

    const retryAction = () => {
        setData("token", "");
        setShowErrorAlert(false);
    };

    // Beautiful Error Alert Component
    const ErrorAlert = () => {
        if (!errors.token || !showErrorAlert) return null;

        return (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[60] max-w-md w-full mx-4">
                <div
                    className={`
                    relative overflow-hidden rounded-2xl border border-red-200/50 
                    bg-gradient-to-br from-red-50/95 to-rose-50/95 
                    backdrop-blur-xl shadow-2xl 
                    transform transition-all duration-500 ease-out
                    ${
                        showErrorAlert
                            ? "opacity-100 scale-100 translate-y-0"
                            : "opacity-0 scale-95 -translate-y-4"
                    }
                `}
                >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-100/30 to-rose-100/30"></div>

                    <div className="relative p-6">
                        <div className="flex items-start space-x-4">
                            {/* Icon dengan animasi */}
                            <div className="flex-shrink-0">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-25"></div>
                                    <div className="relative bg-red-500 rounded-full p-2 shadow-lg">
                                        <AlertCircle className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-red-800 mb-2">
                                    Oops! Ada Masalah
                                </h3>
                                <p className="text-red-700 text-sm leading-relaxed">
                                    {errors.token}
                                </p>

                                {/* Action buttons */}
                                <div className="flex items-center space-x-3 mt-4">
                                    <button
                                        onClick={retryAction}
                                        className="
                                            flex items-center space-x-2 px-4 py-2 
                                            bg-red-500 hover:bg-red-600 
                                            text-white text-sm font-medium rounded-lg 
                                            transition-all duration-200 
                                            hover:shadow-lg hover:scale-105
                                            focus:outline-none focus:ring-2 focus:ring-red-300
                                        "
                                    >
                                        <RefreshCw className="w-4 h-4" />
                                        <span>Coba Lagi</span>
                                    </button>

                                    <button
                                        onClick={closeErrorAlert}
                                        className="
                                            px-4 py-2 text-red-600 hover:text-red-800 
                                            text-sm font-medium transition-colors duration-200
                                            hover:bg-red-100/50 rounded-lg
                                        "
                                    >
                                        Tutup
                                    </button>
                                </div>
                            </div>

                            {/* Close button */}
                            <button
                                onClick={closeErrorAlert}
                                className="
                                    flex-shrink-0 p-1 rounded-full 
                                    text-red-400 hover:text-red-600 hover:bg-red-100/50 
                                    transition-all duration-200 hover:scale-110
                                "
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 via-red-500 to-red-600"></div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Beautiful Error Alert */}
            <ErrorAlert />

            {/* Header */}
            <div className="container mx-auto px-4">
                <div className="relative rounded-2xl overflow-hidden mb-12 shadow-2xl">
                    <img
                        src={`header/header_${userClass}.png`}
                        alt="Header"
                        className="w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
            </div>

            {/* List Ebooks */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap justify-center gap-8">
                    {ebooks.map((ebook, index) => (
                        <div
                            key={ebook.id}
                            className="group relative bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden cursor-pointer transform transition-all duration-700 hover:scale-105 hover:shadow-3xl hover:-rotate-1 w-64 border border-white/30 hover:border-white/60"
                            onClick={() => setSelectedEbook(ebook)}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Floating glow effect */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-75 transition duration-700 blur"></div>

                            {/* Main card content */}
                            <div className="relative bg-gradient-to-br from-white/95 to-white/85 rounded-3xl">
                                {/* Image container */}
                                <div className="relative overflow-hidden rounded-t-3xl">
                                    <img
                                        src={`/cover/${ebook.cover}`}
                                        alt={ebook.ebook}
                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                                    />

                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-40 transition-all duration-500"></div>

                                    {/* Read Ebook Button */}
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                        <button
                                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedEbook(ebook);
                                            }}
                                        >
                                            Read
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="container mx-auto px-4 mb-8">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img
                        src="footer/footer_4.png"
                        alt="Footer"
                        className="w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
                </div>
            </div>

            {/* Modal Detail Ebook */}
            {selectedEbook && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
                    <div className="bg-white/10 backdrop-blur-xl rounded-t-3xl sm:rounded-3xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20 animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-t-3xl sm:rounded-3xl pointer-events-none"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 via-transparent to-purple-600/10 rounded-t-3xl sm:rounded-3xl pointer-events-none"></div>

                        <div className="relative z-10 p-4 sm:p-8">
                            {/* Mobile handle */}
                            <div className="flex justify-center mb-4 sm:hidden">
                                <div className="w-12 h-1 bg-white/40 rounded-full"></div>
                            </div>

                            <div className="flex justify-between items-center mb-6 sm:mb-8">
                                <div>
                                    <h5 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent drop-shadow-sm">
                                        Detail E-book
                                    </h5>
                                    <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 shadow-lg"></div>
                                </div>
                                <button
                                    onClick={() => setSelectedEbook(null)}
                                    className="text-white/70 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-90 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 border border-white/20"
                                >
                                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                                </button>
                            </div>

                            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
                                {/* Book cover with glass container */}
                                <div className="flex-shrink-0 flex justify-center lg:justify-start">
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-3xl blur-xl transform rotate-3 scale-105"></div>
                                        <div className="relative bg-white/20 backdrop-blur-sm rounded-3xl p-3 border border-white/30">
                                            <img
                                                src={`/cover/${selectedEbook.cover}`}
                                                alt={selectedEbook.ebook}
                                                className="w-40 h-52 sm:w-56 sm:h-72 object-cover rounded-2xl shadow-2xl transform transition-all duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-3 bg-gradient-to-t from-black/40 via-transparent to-white/10 rounded-2xl"></div>
                                            <div className="absolute bottom-6 left-6 right-6">
                                                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2 border border-white/50">
                                                    <div className="flex items-center justify-center">
                                                        <Book className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 mr-2" />
                                                        <span className="text-xs font-semibold text-gray-700">
                                                            E-Book Digital
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 space-y-6">
                                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg">
                                        {selectedEbook.ebook}
                                    </h1>

                                    <div className="space-y-3 sm:space-y-4">
                                        <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                                            <div className="flex items-center">
                                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full p-2 mr-3 sm:mr-4 shadow-lg">
                                                    <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                                </div>
                                                <div>
                                                    <span className="text-xs sm:text-sm text-blue-200 font-semibold">
                                                        Tingkat Kelas
                                                    </span>
                                                    <p className="text-base sm:text-lg font-bold text-white">
                                                        Kelas{" "}
                                                        {selectedEbook.kelas}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                                            <div className="flex items-center">
                                                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-full p-2 mr-3 sm:mr-4 shadow-lg">
                                                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                                </div>
                                                <div>
                                                    <span className="text-xs sm:text-sm text-green-200 font-semibold">
                                                        Penulis
                                                    </span>
                                                    <p className="text-base sm:text-lg font-bold text-white">
                                                        {selectedEbook.author}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Token Input Section */}
                                    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 sm:p-6 border border-white/30 shadow-2xl">
                                        <h3 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center">
                                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2 mr-3 shadow-lg">
                                                <Key className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                            </div>
                                            Akses E-book
                                        </h3>

                                        <div className="space-y-4">
                                            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                                                <div className="flex-1 w-full">
                                                    <div className="relative">
                                                        <Key className="w-4 h-4 sm:w-5 sm:h-5 text-white/60 absolute left-4 top-1/2 transform -translate-y-1/2" />
                                                        <input
                                                            type="text"
                                                            name="token"
                                                            value={data.token}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "token",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            disabled={
                                                                processing
                                                            }
                                                            className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 border-2 border-white/30 rounded-2xl focus:ring-4 focus:ring-blue-300/50 focus:border-white/50 text-center text-base sm:text-lg font-semibold placeholder-white/60 bg-white/10 backdrop-blur-sm transition-all duration-300 text-white disabled:opacity-50"
                                                            placeholder="Masukkan Token Akses"
                                                        />
                                                        <input
                                                            type="hidden"
                                                            name="file_pdf"
                                                            value={
                                                                data.file_pdf
                                                            }
                                                        />
                                                        <input
                                                            type="hidden"
                                                            name="id_nama"
                                                            value={data.id_nama}
                                                        />
                                                    </div>
                                                </div>

                                                <button
                                                    type="submit"
                                                    onClick={handleSubmit}
                                                    disabled={
                                                        processing ||
                                                        !data.token.trim()
                                                    }
                                                    className="w-full sm:w-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 shadow-xl border border-white/20 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                                >
                                                    <span className="flex items-center justify-center">
                                                        {processing
                                                            ? "Loading..."
                                                            : "GO"}
                                                        {!processing && (
                                                            <Sparkles className="w-4 h-4 ml-2 animate-pulse" />
                                                        )}
                                                    </span>
                                                </button>
                                            </div>

                                            <div className="bg-white/10 backdrop-blur-sm rounded-xl py-3 px-4 border border-white/20">
                                                <p className="text-xs sm:text-sm text-white/80 text-center">
                                                    Masukkan token untuk
                                                    mengakses konten e-book
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PageClass;

// --- fungsi helper openDB ---
// function openDB(name, version, upgradeCallback) {
//     return new Promise((resolve, reject) => {
//         const request = indexedDB.open(name, version);
//         request.onupgradeneeded = (e) => {
//             upgradeCallback(e.target.result);
//         };
//         request.onsuccess = (e) => resolve(e.target.result);
//         request.onerror = (e) => reject(e.target.error);
//     });
// }

// async function savePdfToIndexedDB(filename) {
//     // Fetch file PDF dari public/file
//     const response = await fetch(`/pdf/${filename}`);
//     const blob = await response.blob(); // Ambil sebagai Blob

//     const openRequest = indexedDB.open("pdfDatabase", 1);

//     openRequest.onupgradeneeded = function (event) {
//         const db = event.target.result;
//         if (!db.objectStoreNames.contains("pdfs")) {
//             db.createObjectStore("pdfs");
//         }
//     };

//     openRequest.onsuccess = function (event) {
//         const db = event.target.result;
//         const transaction = db.transaction("pdfs", "readwrite");
//         const store = transaction.objectStore("pdfs");

//         // Simpan blob PDF ke IndexedDB
//         const putRequest = store.put(blob, filename);

//         putRequest.onsuccess = function () {
//             console.log("PDF berhasil disimpan ke IndexedDB!");
//         };

//         putRequest.onerror = function () {
//             console.error("Gagal menyimpan PDF ke IndexedDB");
//         };
//     };
// }

// // Panggil fungsi dengan nama file kamu
// savePdfToIndexedDB("Bahasa Indonesia_kelas6.pdf");

// Contoh: Simpan 2 file PDF dari public/file
// savePDF("Bahasa Indonesia_kelas6.pdf", "/pdf/Bahasa Indonesia_kelas6.pdf");
