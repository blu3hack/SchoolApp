import { Dialog } from "@headlessui/react";
import React from "react";

function ModalUploadUsers({
    open,
    onClose,
    progress,
    onSubmit,
    data,
    setData,
    errors,
}) {
    return (
        <div>
            <Dialog open={open} onClose={onClose} className="relative z-50">
                {/* Enhanced backdrop with advanced blur and overlay */}
                <div
                    className="fixed inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-pink-900/20 backdrop-blur-xl"
                    aria-hidden="true"
                >
                    {/* Animated background particles */}
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-indigo-300 rounded-full animate-ping"></div>
                        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-purple-300 rounded-full animate-pulse"></div>
                    </div>
                </div>

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl ring-1 ring-white/10 transition-all duration-300 hover:bg-white/15">
                        {/* Glassmorphism header with floating effect */}
                        <div className="relative bg-gradient-to-r from-indigo-500/80 via-purple-600/80 to-pink-500/80 backdrop-blur-sm px-8 py-6 border-b border-white/10">
                            {/* Decorative background shapes */}
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="absolute -top-4 -left-4 w-8 h-8 bg-white/10 rounded-full blur-sm"></div>
                                <div className="absolute top-2 right-8 w-12 h-12 bg-white/5 rounded-full blur-md"></div>
                            </div>

                            <Dialog.Title className="text-2xl font-bold text-white flex items-center relative z-10">
                                {/* Enhanced upload icon */}
                                <div className="relative mr-4">
                                    <svg
                                        className="w-8 h-8"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 12l3-3m0 0l3 3m-3-3v12"
                                        />
                                    </svg>
                                    {/* Glow effect */}
                                    <div className="absolute inset-0 bg-white/30 rounded-full blur-sm animate-pulse"></div>
                                </div>
                                Upload Excel File
                            </Dialog.Title>
                        </div>

                        {/* Glass content area */}
                        <form
                            onSubmit={onSubmit}
                            className="p-8 space-y-8 bg-white/5 backdrop-blur-sm"
                        >
                            {/* Enhanced file input with glass effect */}
                            <div className="space-y-4">
                                <label className="text-sm font-semibold text-white/90 mb-3 flex items-center">
                                    <svg
                                        className="w-5 h-5 mr-2 text-indigo-300"
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
                                    Pilih File
                                </label>

                                <div className="relative group">
                                    <input
                                        type="file"
                                        accept=".xlsx,.xls,.csv"
                                        onChange={(e) =>
                                            setData("file", e.target.files[0])
                                        }
                                        className="block w-full text-sm text-white/80 file:mr-4 file:py-4 file:px-6 file:rounded-xl
                                             file:text-sm file:font-semibold file:bg-white/10 file:text-white 
                                             file:backdrop-blur-sm file:border file:border-white/20
                                             hover:file:bg-white/20 file:transition-all file:duration-300
                                             file:shadow-lg hover:file:shadow-xl file:hover:scale-105
                                             border-2 border-dashed border-white/30 rounded-2xl p-6 
                                             bg-white/5 backdrop-blur-sm
                                             hover:border-indigo-400/50 focus:border-indigo-500/70 
                                             focus:ring-2 focus:ring-indigo-400/30 
                                             transition-all duration-300 group-hover:bg-white/10"
                                    />

                                    {/* Floating upload icon */}
                                    <div className="absolute top-6 right-6 pointer-events-none">
                                        <div className="relative">
                                            <svg
                                                className="w-6 h-6 text-white/60 group-hover:text-indigo-300 transition-colors duration-300"
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
                                            <div className="absolute inset-0 bg-indigo-400/30 rounded-full blur-lg animate-pulse"></div>
                                        </div>
                                    </div>

                                    {/* Decorative corner elements */}
                                    <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-white/20 rounded-tl-lg"></div>
                                    <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-white/20 rounded-br-lg"></div>
                                </div>

                                <div className="flex items-center space-x-2 text-xs text-white/70 bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                                    <svg
                                        className="w-4 h-4 text-emerald-400"
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
                                    <span>
                                        Format yang didukung: .xlsx, .xls, .csv
                                        (Maksimal 10MB)
                                    </span>
                                </div>
                            </div>

                            {/* Enhanced error message with glass effect */}
                            {errors.file && (
                                <div className="bg-red-500/10 backdrop-blur-sm border border-red-400/30 rounded-2xl p-4 shadow-lg">
                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className="relative">
                                                <svg
                                                    className="h-6 w-6 text-red-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <div className="absolute inset-0 bg-red-400/20 rounded-full blur-sm animate-pulse"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-red-300 font-medium">
                                                {errors.file}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Glass progress bar */}
                            {progress && (
                                <div className="space-y-3 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                                    <div className="flex justify-between items-center text-sm text-white/90">
                                        <span className="flex items-center">
                                            <svg
                                                className="w-4 h-4 mr-2 animate-spin text-indigo-400"
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
                                            Mengupload...
                                        </span>
                                        <span className="font-semibold text-indigo-300">
                                            {Math.round(progress.percentage)}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-white/10 backdrop-blur-sm rounded-full h-4 overflow-hidden border border-white/20">
                                        <div
                                            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-4 transition-all duration-500 ease-out relative overflow-hidden"
                                            style={{
                                                width: `${progress.percentage}%`,
                                            }}
                                        >
                                            {/* Shimmer effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                                            {/* Glow effect */}
                                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Enhanced glass button group */}
                            <div className="flex justify-end space-x-4 pt-6 border-t border-white/10">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="group relative px-8 py-3 text-sm font-semibold text-white/90 
                                         bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl 
                                         hover:bg-white/20 hover:border-white/30 
                                         focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent
                                         transition-all duration-300 shadow-lg hover:shadow-xl
                                         transform hover:-translate-y-0.5"
                                >
                                    <span className="flex items-center">
                                        <svg
                                            className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-300"
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
                                        Batal
                                    </span>
                                </button>

                                <button
                                    type="submit"
                                    disabled={!data.file}
                                    className="group relative px-8 py-3 text-sm font-semibold text-white 
                                         bg-gradient-to-r from-indigo-500/80 via-purple-600/80 to-pink-500/80 
                                         backdrop-blur-sm border border-white/20 rounded-xl
                                         hover:from-indigo-500 hover:via-purple-600 hover:to-pink-500
                                         focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:ring-offset-2 focus:ring-offset-transparent
                                         disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                                         transition-all duration-300 shadow-lg hover:shadow-2xl
                                         transform hover:-translate-y-1 hover:scale-105
                                         overflow-hidden"
                                >
                                    {/* Button background glow */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg"></div>

                                    <span className="relative flex items-center">
                                        <svg
                                            className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 12l3-3m0 0l3 3m-3-3v12"
                                            />
                                        </svg>
                                        Upload File
                                    </span>

                                    {/* Shimmer effect for enabled state */}
                                    {data.file && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
                                    )}
                                </button>
                            </div>
                        </form>

                        {/* Decorative bottom accent */}
                        <div className="h-2 bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-pink-500/50 backdrop-blur-sm"></div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
}

export default ModalUploadUsers;
