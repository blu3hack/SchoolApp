import React from "react";

export default function Toolbox({
    showToolbox,
    toggleToolbox,
    toggleDrawing,
    clearCanvas,
    isDrawing,
}) {
    return (
        <>
            {/* Toolbar Toggle Button */}
            <div className="fixed bottom-4 left-4 z-50">
                <button
                    onClick={toggleToolbox}
                    className="bg-white hover:bg-gray-50 text-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
                    title={showToolbox ? "Hide Toolbox" : "Show Toolbox"}
                >
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
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                </button>
            </div>

            {/* Toolbox Panel */}
            <div
                className={`fixed bottom-20 left-4 z-40 transition-opacity duration-300 ${
                    showToolbox ? "opacity-100" : "opacity-0 hidden"
                }`}
            >
                <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-4 w-64">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">
                        Toolbox
                    </h3>

                    <div className="space-y-3">
                        {/* Pencil Annotation Controls */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                                Pencil
                            </span>
                            <div className="flex space-x-2">
                                <button
                                    onClick={toggleDrawing}
                                    className={`px-3 py-1 rounded text-sm transition-colors ${
                                        isDrawing
                                            ? "bg-red-500 text-white"
                                            : "bg-blue-500 text-white"
                                    }`}
                                >
                                    {isDrawing ? "Stop" : "Draw"}
                                </button>
                                <button
                                    onClick={clearCanvas}
                                    className="px-3 py-1 bg-gray-500 text-white rounded text-sm transition-colors"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>

                        {/* Zoom Controls */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Zoom</span>
                            <div className="flex space-x-2">
                                <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded text-sm transition-colors">
                                    -
                                </button>
                                <span className="text-sm text-gray-700 px-2">
                                    100%
                                </span>
                                <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded text-sm transition-colors">
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Fullscreen Toggle */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                                Fullscreen
                            </span>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
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
                                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Backdrop */}
            {showToolbox && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-20 z-30"
                    onClick={toggleToolbox}
                ></div>
            )}
        </>
    );
}
