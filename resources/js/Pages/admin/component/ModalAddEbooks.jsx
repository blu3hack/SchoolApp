import { Dialog } from "@headlessui/react";
import React from "react";
import { usePage } from "@inertiajs/react";

function EbooksFormModal({ open, onClose, onSubmit, data, setData, errors }) {
    const { auth } = usePage().props;
    const role = auth.user.role;
    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            {/* Simple backdrop */}
            <div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm"
                aria-hidden="true"
            />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-200">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-100">
                        <Dialog.Title className="text-xl font-semibold text-gray-900 flex items-center">
                            <svg
                                className="w-6 h-6 mr-3 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            Form Upload Ebooks
                        </Dialog.Title>
                    </div>

                    {/* Content */}
                    <form
                        onSubmit={onSubmit}
                        encType="multipart/form-data"
                        className="p-6 space-y-5"
                    >
                        {/* unik ID */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700 flex items-center">
                                <svg
                                    className="w-4 h-4 mr-2 text-gray-500"
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
                                Author
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                name="Author"
                                value={data.Author}
                                onChange={(e) =>
                                    setData("Author", e.target.value)
                                }
                                placeholder="Masukkan Nama Author"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400"
                            />
                        </div>

                        <div></div>

                        {/* Department and Position Row */}

                        {/* Department Select */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center">
                                <svg
                                    className="w-4 h-4 mr-2 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h4a1 1 0 011 1v5m-6 0h6"
                                    />
                                </svg>
                                Kelas
                            </label>
                            <select
                                name="Kelas"
                                value={data.kelas}
                                onChange={(e) =>
                                    setData("Kelas", e.target.value)
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
                            >
                                <option value="" className="hidden">
                                    Pilih Kelas
                                </option>
                                {role === "AdminSD" ? (
                                    <>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                    </>
                                ) : role === "AdminSMP" ? (
                                    <>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                    </>
                                ) : (
                                    <>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="3">3</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                    </>
                                )}
                            </select>
                        </div>

                        {/* Status Select */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center">
                                <svg
                                    className="w-4 h-4 mr-2 text-gray-500"
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
                                Ebook
                            </label>
                            <select
                                name="Ebook"
                                value={data.Ebook}
                                onChange={(e) =>
                                    setData("Ebook", e.target.value)
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
                            >
                                <option disabled>Pilih Ebook</option>
                                <option value="Al-Quran dan Hadist">
                                    Al-Quran dan Hadist
                                </option>
                                <option value="Bahasa Arab">
                                    Bahasa Arab{" "}
                                </option>
                                <option value="Bahasa Indonesia">
                                    Bahasa Indonesia
                                </option>
                                <option value="PPKN">PPKN</option>
                                <option value="Bahasa Inggris">
                                    Bahasa Inggris
                                </option>
                                <option value="IPA">IPA</option>
                                <option value="IPAS">IPAS</option>
                                <option value="IPS">IPS</option>
                                <option value="Matematika">Matematika</option>
                                <option value="PABP">PABP</option>
                                <option value="Seni Budaya">Seni Budaya</option>
                            </select>
                        </div>

                        {/* File Upload */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center">
                                <svg
                                    className="w-4 h-4 mr-2 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                    />
                                </svg>
                                Upload Cover
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    name="cover"
                                    onChange={(e) =>
                                        setData("cover", e.target.files[0])
                                    }
                                    accept="jpg,.jpeg,.png"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                <div className="mt-1 text-xs text-gray-500">
                                    Format yang didukung: JPG, JPEG, PNG
                                </div>
                            </div>
                        </div>

                        {/* File Upload */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center">
                                <svg
                                    className="w-4 h-4 mr-2 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                    />
                                </svg>
                                Upload Ebook
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    name="File_pdf"
                                    onChange={(e) =>
                                        setData("File_pdf", e.target.files[0])
                                    }
                                    accept="pdf"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                <div className="mt-1 text-xs text-gray-500">
                                    Format yang didukung: PDF
                                </div>
                            </div>
                        </div>

                        {/* Error message display */}
                        {errors && Object.keys(errors).length > 0 && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                <div className="flex items-start space-x-2">
                                    <svg
                                        className="h-5 w-5 text-red-400 mt-0.5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <div>
                                        <p className="text-sm text-red-700 font-medium">
                                            Terjadi kesalahan:
                                        </p>
                                        <ul className="text-sm text-red-600 mt-1 space-y-1">
                                            {Object.entries(errors).map(
                                                ([field, message]) => (
                                                    <li key={field}>
                                                        • {message}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Button group */}
                        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors duration-200"
                            >
                                Batal
                            </button>

                            <button
                                type="submit"
                                className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                            >
                                <span className="flex items-center">
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                    Simpan Data
                                </span>
                            </button>
                        </div>
                    </form>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}

export default EbooksFormModal;
