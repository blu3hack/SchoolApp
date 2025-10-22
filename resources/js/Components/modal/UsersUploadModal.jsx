import { useForm } from "@inertiajs/react";
import React, { useState } from "react";

const ExcelUploadModal = ({ isOpen, setIsOpen }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        excelFile: null,
    });

    const [isDragOver, setIsDragOver] = useState(false);
    const [fileName, setFileName] = useState("");

    const handleFileUpload = (event) => {
        event.preventDefault();
        post("/users/import", {
            onSuccess: () => {
                setIsOpen(false);
                reset();
                setFileName("");
            },
            onError: (errors) => {
                console.error("Upload failed:", errors);
            },
        });
    };

    const handleFileChange = (file) => {
        if (file) {
            setData("excelFile", file);
            setFileName(file.name);
        }
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);

        const files = e.dataTransfer.files;
        if (files && files[0]) {
            const file = files[0];
            if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
                handleFileChange(file);
            }
        }
    };

    const closeModal = () => {
        setIsOpen(false);
        reset();
        setFileName("");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100 animate-in">
                {/* Header */}
                <div className="px-8 pt-8 pb-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">
                                    Upload Excel
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    Pilih file Excel untuk diupload
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={closeModal}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
                            disabled={processing}
                        >
                            <svg
                                className="w-5 h-5 text-gray-400"
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
                        </button>
                    </div>
                </div>

                {/* Body */}
                <form onSubmit={handleFileUpload} className="px-8 py-6">
                    <div className="mb-6">
                        {/* Drag and Drop Area */}
                        <div
                            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                                isDragOver
                                    ? "border-emerald-400 bg-emerald-50"
                                    : fileName
                                    ? "border-emerald-300 bg-emerald-50"
                                    : "border-gray-300 hover:border-gray-400"
                            }`}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                id="excelFile"
                                accept=".xlsx,.xls"
                                onChange={(e) =>
                                    handleFileChange(e.target.files[0])
                                }
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                disabled={processing}
                            />

                            {fileName ? (
                                <div className="space-y-3">
                                    <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center">
                                        <svg
                                            className="w-8 h-8 text-emerald-600"
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
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 truncate">
                                            {fileName}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            File siap untuk diupload
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                                        <svg
                                            className="w-8 h-8 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold text-gray-700">
                                            Drag & drop file Excel di sini
                                        </p>
                                        <p className="text-sm text-gray-500 mt-2">
                                            atau{" "}
                                            <span className="text-emerald-600 font-medium">
                                                klik untuk memilih file
                                            </span>
                                        </p>
                                        <p className="text-xs text-gray-400 mt-3">
                                            Mendukung format .xlsx dan .xls
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {errors.excelFile && (
                            <div className="mt-3 flex items-center space-x-2 text-red-600">
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
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <p className="text-sm">{errors.excelFile}</p>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            disabled={processing}
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                            disabled={processing || !data.excelFile}
                        >
                            {processing ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <svg
                                        className="animate-spin w-4 h-4"
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
                                    <span>Mengupload...</span>
                                </div>
                            ) : (
                                "Upload File"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ExcelUploadModal;
