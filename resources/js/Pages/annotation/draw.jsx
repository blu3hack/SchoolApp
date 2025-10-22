import React, { useState, useEffect, useRef } from "react";
import * as fabric from "fabric";
import Toolbar from "./Toolbar";
import "./style.css";

export default function AnnotationCanvas() {
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);
    const [brushSize, setBrushSize] = useState(5);
    const [brushColor, setBrushColor] = useState("#000000");
    const [activeTool, setActiveTool] = useState("pencil");

    const hexToRgba = (hex, alpha) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r},${g},${b},${alpha})`;
    };

    useEffect(() => {
        const c = new fabric.Canvas(canvasRef.current, {
            isDrawingMode: true,
            selection: false,
        });

        c.on("object:added", (e) => {
            if (e.target) e.target.set({ erasable: true });
        });

        const handleDelete = (e) => {
            if (e.key === "Delete") {
                c.getActiveObjects().forEach((obj) => c.remove(obj));
                c.discardActiveObject();
                c.requestRenderAll();
            }
        };
        window.addEventListener("keydown", handleDelete);

        setCanvas(c);
        return () => {
            c.dispose();
            window.removeEventListener("keydown", handleDelete);
        };
    }, []);

    useEffect(() => {
        if (!canvas || !canvas.freeDrawingBrush) return;
        canvas.freeDrawingBrush.width = brushSize;
    }, [brushSize]);

    const handleToolChange = (tool) => {
        if (!canvas) return;
        setActiveTool(tool);

        if (tool === "pencil") {
            const brush = new fabric.PencilBrush(canvas);
            brush.width = brushSize;
            brush.color = brushColor;
            canvas.freeDrawingBrush = brush;
            canvas.isDrawingMode = true;
            canvas.selection = false;
        }

        if (tool === "marker") {
            const brush = new fabric.PencilBrush(canvas);
            brush.width = brushSize;
            brush.color = hexToRgba(brushColor, 0.5);
            canvas.freeDrawingBrush = brush;
            canvas.isDrawingMode = true;
            canvas.selection = false;
        }

        if (tool === "eraser") {
            const brush = new fabric.PencilBrush(canvas);
            brush.width = brushSize;

            // Ambil warna background canvas, kalau tidak ada default ke putih
            brush.color = canvas.backgroundColor || "#ffffff";

            canvas.freeDrawingBrush = brush;
            canvas.isDrawingMode = true;
            canvas.selection = false;
        }

        if (tool === "triangle") {
            const triangle = new fabric.Triangle({
                left: 100,
                top: 100,
                fill: brushColor,
                width: 100,
                height: 100,
            });
            canvas.add(triangle);
            canvas.setActiveObject(triangle);
            canvas.renderAll();
        }

        if (tool === "selection") {
            canvas.isDrawingMode = false;
            canvas.selection = true;
        }
    };

    const addShape = (type) => {
        if (!canvas) return;

        let shape;
        if (type === "rectangle") {
            shape = new fabric.Rect({
                left: 100,
                top: 100,
                fill: brushColor,
                width: 100,
                height: 60,
                selectable: true,
                erasable: true,
            });
        }
        if (type === "circle") {
            shape = new fabric.Circle({
                left: 150,
                top: 150,
                radius: 50,
                fill: brushColor,
                selectable: true,
                erasable: true,
            });
        }
        if (type === "line") {
            shape = new fabric.Line([50, 100, 200, 100], {
                stroke: brushColor,
                strokeWidth: brushSize,
                selectable: true,
                erasable: true,
            });
        }
        if (type === "text") {
            shape = new fabric.Textbox("New Text", {
                left: 200,
                top: 200,
                fontSize: 24,
                fill: brushColor,
                selectable: true,
                editable: true, // supaya bisa di-edit langsung
            });
        }

        if (type === "triangle") {
            shape = new fabric.Triangle({
                left: 150,
                top: 150,
                radius: 50,
                fill: brushColor,
                selectable: true,
                erasable: true,
            });
        }

        if (shape) {
            canvas.add(shape);
            canvas.setActiveObject(shape);
            canvas.requestRenderAll();
        }
    };

    const [isToolbarOpen, setIsToolbarOpen] = useState(false);

    return (
        <div className="bg-white p-4 min-h-screen flex flex-col items-center justify-center relative scrollbar-hide">
            <style jsx>{`
                /* Sembunyikan scrollbar untuk Chrome, Safari, dan Opera */
                ::-webkit-scrollbar {
                    display: none;
                }
                /* Sembunyikan scrollbar untuk IE, Edge, dan Firefox */
                html,
                body {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
            <canvas
                ref={canvasRef}
                width={800}
                height={1200}
                className="border border-gray-300 rounded-lg shadow-lg"
            />

            {/* Toggle Button */}
            <button
                onClick={() => setIsToolbarOpen(!isToolbarOpen)}
                className="fixed top-6 left-6 z-50 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 
                         hover:from-blue-600 hover:to-indigo-700 text-white rounded-full shadow-xl 
                         hover:shadow-2xl transition-all duration-300 ease-out hover:scale-110 
                         active:scale-95 border border-white/20 backdrop-blur-sm"
                title={isToolbarOpen ? "Close Toolbar" : "Open Toolbar"}
            >
                <div className="flex items-center justify-center">
                    <span
                        className={`text-xl transition-transform duration-300 ${
                            isToolbarOpen ? "rotate-45" : ""
                        }`}
                    >
                        {isToolbarOpen ? "✕" : "🎨"}
                    </span>
                </div>

                {/* Pulse effect when closed */}
                {!isToolbarOpen && (
                    <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20"></div>
                )}
            </button>

            {/* Vertical Toolbar Panel */}
            <div
                className={`fixed top-20 left-6 z-40 transition-all duration-500 ease-out transform
                           ${
                               isToolbarOpen
                                   ? "translate-x-0 opacity-100 scale-100"
                                   : "-translate-x-8 opacity-0 scale-95 pointer-events-none"
                           }`}
            >
                <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-3 max-h-[80vh] overflow-y-auto scrollbar-hide">
                    {/* Vertical Toolbar Content */}
                    <div className="flex flex-col gap-4">
                        {/* Tool Buttons - Vertical */}
                        <div className="flex flex-col gap-2 p-2 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100">
                            <div className="text-xs font-medium text-slate-600 mb-1">
                                Tools
                            </div>
                            <button
                                onClick={() => handleToolChange("pencil")}
                                className={`px-3 py-2 rounded-lg border transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md
                                           ${
                                               activeTool === "pencil"
                                                   ? "bg-blue-100 border-blue-200 text-blue-700"
                                                   : "bg-white border-gray-200 text-slate-700 hover:bg-gray-50"
                                           }`}
                            >
                                ✏️ Pencil
                            </button>
                            <button
                                onClick={() => handleToolChange("marker")}
                                className={`px-3 py-2 rounded-lg border transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md
                                           ${
                                               activeTool === "marker"
                                                   ? "bg-blue-100 border-blue-200 text-blue-700"
                                                   : "bg-white border-gray-200 text-slate-700 hover:bg-gray-50"
                                           }`}
                            >
                                🖍 Marker
                            </button>
                            <button
                                onClick={() => handleToolChange("eraser")}
                                className={`px-3 py-2 rounded-lg border transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md
                                           ${
                                               activeTool === "eraser"
                                                   ? "bg-blue-100 border-blue-200 text-blue-700"
                                                   : "bg-white border-gray-200 text-slate-700 hover:bg-gray-50"
                                           }`}
                            >
                                🩹 Eraser
                            </button>
                            <button
                                onClick={() => handleToolChange("selection")}
                                className={`px-3 py-2 rounded-lg border transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md
                                           ${
                                               activeTool === "selection"
                                                   ? "bg-blue-100 border-blue-200 text-blue-700"
                                                   : "bg-white border-gray-200 text-slate-700 hover:bg-gray-50"
                                           }`}
                            >
                                🔲 Select
                            </button>
                        </div>

                        {/* Shapes */}
                        <div className="p-2 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100">
                            <div className="text-xs font-medium text-slate-600 mb-2">
                                Shapes
                            </div>
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => addShape("rectangle")}
                                    className="px-3 py-2 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 
                                             rounded-lg transition-all duration-200 text-sm font-medium text-slate-700 hover:text-blue-600"
                                >
                                    ▭ Rectangle
                                </button>
                                <button
                                    onClick={() => addShape("circle")}
                                    className="px-3 py-2 bg-white hover:bg-green-50 border border-gray-200 hover:border-green-300 
                                             rounded-lg transition-all duration-200 text-sm font-medium text-slate-700 hover:text-green-600"
                                >
                                    ⚪ Circle
                                </button>
                                <button
                                    onClick={() => addShape("line")}
                                    className="px-3 py-2 bg-white hover:bg-orange-50 border border-gray-200 hover:border-orange-300 
                                             rounded-lg transition-all duration-200 text-sm font-medium text-slate-700 hover:text-orange-600"
                                >
                                    ／ Line
                                </button>
                                {/* Tombol baru untuk Text */}
                                <button
                                    onClick={() => addShape("text")}
                                    className="px-3 py-2 bg-white hover:bg-purple-50 border border-gray-200 hover:border-purple-300 rounded-lg transition-all duration-200 text-sm font-medium text-slate-700 hover:text-purple-600"
                                >
                                    🅰 Text
                                </button>
                                {/* Tombol baru untuk triangle */}
                                <button
                                    onClick={() => addShape("triangle")}
                                    className="px-3 py-2 bg-white hover:bg-purple-50 border border-gray-200 hover:border-purple-300 rounded-lg transition-all duration-200 text-sm font-medium text-slate-700 hover:text-purple-600"
                                >
                                    🔻Triangle
                                </button>
                            </div>
                        </div>

                        {/* Color & Size */}
                        <div className="p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100">
                            <div className="text-xs font-medium text-slate-600 mb-3">
                                Settings
                            </div>

                            {/* Color */}
                            <div className="flex flex-col items-center gap-2 mb-4">
                                <span className="text-xs text-slate-600">
                                    Color
                                </span>
                                <div className="relative inline-block group">
                                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                                    <input
                                        type="color"
                                        value={brushColor}
                                        onChange={(e) => {
                                            const color = e.target.value;
                                            setBrushColor(color);
                                            if (activeTool === "pencil") {
                                                canvas.freeDrawingBrush.color =
                                                    color;
                                            }
                                            if (activeTool === "marker") {
                                                canvas.freeDrawingBrush.color =
                                                    hexToRgba(color, 0.5);
                                            }
                                        }}
                                        className="relative w-14 h-14 rounded-full border-3 border-white hover:border-gray-100 
                                                 shadow-lg hover:shadow-xl cursor-pointer
                                                 transition-all duration-300 ease-out
                                                 hover:scale-110 hover:-translate-y-1
                                                 active:scale-105 active:translate-y-0
                                                 ring-2 ring-gray-200 hover:ring-blue-200"
                                        style={{
                                            WebkitAppearance: "none",
                                            MozAppearance: "none",
                                            appearance: "none",
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Size */}
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-xs text-slate-600">
                                    Size
                                </span>
                                <div className="relative inline-block group">
                                    <div className="absolute -inset-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="50"
                                        value={brushSize}
                                        onChange={(e) => {
                                            const size = parseInt(
                                                e.target.value
                                            );
                                            setBrushSize(size);
                                            if (canvas?.freeDrawingBrush) {
                                                canvas.freeDrawingBrush.width =
                                                    size;
                                            }
                                        }}
                                        className="relative w-24 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer
                                                 hover:bg-gray-300 transition-colors duration-300 shadow-sm hover:shadow-md
                                                 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                                                 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-400
                                                 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer
                                                 [&::-webkit-slider-thumb]:hover:bg-blue-50 [&::-webkit-slider-thumb]:hover:border-blue-500
                                                 [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-200"
                                    />
                                </div>
                                <span className="text-xs text-slate-500 bg-gray-100 px-2 py-1 rounded-full">
                                    {brushSize}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Backdrop overlay when toolbar is open */}
            {isToolbarOpen && (
                <div
                    className="fixed inset-0 bg-black/10 backdrop-blur-sm z-30 transition-opacity duration-300"
                    onClick={() => setIsToolbarOpen(false)}
                />
            )}
            <style jsx>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}
