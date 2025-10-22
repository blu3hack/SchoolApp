import React, { useState, useEffect, useRef } from "react";
import * as fabric from "fabric";

const AnnotationCanvas = () => {
    const canvasRef = useRef(null);
    const [fabricCanvas, setFabricCanvas] = useState(null);
    const [mode, setMode] = useState(null);
    const [color, setColor] = useState("#000000");
    const [selectedEmoji, setSelectedEmoji] = useState("😊");
    const [brushSize, setBrushSize] = useState(5);
    const [isToolboxVisible, setIsToolboxVisible] = useState(true);
    const laserPointerRef = useRef(null);
    // SVG Icons as components
    const ChevronUp = () => (
        <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
            />
        </svg>
    );
    const emojis = ["😊", "😂", "👍", "❤️", "🔥", "🎉", "💡", "⭐", "🌟", "🎯"];

    const ChevronDown = () => (
        <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
            />
        </svg>
    );

    const Settings = () => (
        <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
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
    );

    const Square = () => (
        <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
            />
        </svg>
    );

    const Circle = () => (
        <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <circle cx="12" cy="12" r="10" />
        </svg>
    );

    const Type = () => (
        <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h7"
            />
        </svg>
    );

    const MousePointer2 = () => (
        <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
            />
        </svg>
    );

    const Brush = () => (
        <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
        </svg>
    );

    const Highlighter = () => (
        <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
        </svg>
    );

    const RotateCcw = () => (
        <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
            />
        </svg>
    );

    const Trash2 = () => (
        <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
        </svg>
    );

    const Download = () => (
        <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
        </svg>
    );

    const Palette = () => (
        <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3v18M15 8l4-4V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v1l-4 4H9l4-4z"
            />
        </svg>
    );

    useEffect(() => {
        const canvas = new fabric.Canvas(canvasRef.current, {
            width: 800,
            height: 1000,
            backgroundColor: "#ffffff",
        });
        setFabricCanvas(canvas);
        return () => {
            canvas.dispose();
        };
    }, []);

    const hexToRgba = (hex, alpha) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const setDrawingMode = (brushType) => {
        if (!fabricCanvas) return;
        setMode("draw");
        fabricCanvas.isDrawingMode = true;
        fabricCanvas.contextTop.globalCompositeOperation = "source-over";

        fabricCanvas.freeDrawingBrush = new fabric.PencilBrush(fabricCanvas);
        fabricCanvas.isEraserMode = false;

        let brush;
        let size = brushSize;

        switch (brushType) {
            case "highlighter":
                brush = new fabric.PencilBrush(fabricCanvas);
                size = brushSize > 10 ? brushSize : 20;
                brush.color = hexToRgba(color, 0.4);
                break;
            case "crayon":
                brush = new fabric.SprayBrush(fabricCanvas);
                size = brushSize * 3;
                brush.density = 20;
                brush.color = color;
                break;
            case "pencil":
            default:
                brush = new fabric.PencilBrush(fabricCanvas);
                size = brushSize;
                brush.color = color;
                break;
        }

        brush.width = size;
        fabricCanvas.freeDrawingBrush = brush;
    };

    const disableModes = () => {
        setMode(null);
        if (fabricCanvas) {
            fabricCanvas.isDrawingMode = false;
            fabricCanvas.isEraserMode = false;
            fabricCanvas.contextTop.globalCompositeOperation = "source-over";
        }
    };

    const addRectangle = () => {
        setMode("rect");
        if (fabricCanvas) fabricCanvas.isDrawingMode = false;
        fabricCanvas.isEraserMode = false;
        fabricCanvas.contextTop.globalCompositeOperation = "source-over";
    };

    const addCircle = () => {
        setMode("circle");
        if (fabricCanvas) fabricCanvas.isDrawingMode = false;
        fabricCanvas.isEraserMode = false;
        fabricCanvas.contextTop.globalCompositeOperation = "source-over";
    };

    const addText = () => {
        setMode("text");
        if (fabricCanvas) fabricCanvas.isDrawingMode = false;
        fabricCanvas.isEraserMode = false;
        fabricCanvas.contextTop.globalCompositeOperation = "source-over";
    };

    const addLaserPointer = () => {
        if (!fabricCanvas) return;
        setMode("pointer");
        fabricCanvas.isDrawingMode = false;
        fabricCanvas.isEraserMode = false;
        fabricCanvas.contextTop.globalCompositeOperation = "source-over";
    };

    const clearCanvas = () => {
        if (fabricCanvas) {
            fabricCanvas.clear();
            fabricCanvas.backgroundColor = "#ffffff";
            fabricCanvas.renderAll();
        }
        setMode(null);
        fabricCanvas.isEraserMode = false;
        fabricCanvas.contextTop.globalCompositeOperation = "source-over";
    };

    const saveCanvasAsImage = () => {
        if (!fabricCanvas) return;
        const dataURL = fabricCanvas.toDataURL({
            format: "png",
            quality: 1,
        });
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "annotation_canvas.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleColorChange = (e) => {
        const newColor = e.target.value;
        setColor(newColor);
        if (mode === "draw" && fabricCanvas) {
            const brush = fabricCanvas.freeDrawingBrush;
            if (brush) {
                if (brush instanceof fabric.PencilBrush && brush.width > 10) {
                    brush.color = hexToRgba(newColor, 0.4);
                } else {
                    brush.color = newColor;
                }
            }
        }
    };

    const handleBrushSizeChange = (e) => {
        const newSize = parseInt(e.target.value);
        setBrushSize(newSize);
        if (fabricCanvas) {
            if (mode === "draw" || mode === "eraser") {
                const brush = fabricCanvas.freeDrawingBrush;
                if (brush) {
                    brush.width = newSize;
                }
            }
        }
    };

    const handleEmojiChange = (emoji) => {
        setSelectedEmoji(emoji);
        setMode("emoji");
        if (fabricCanvas) {
            fabricCanvas.isDrawingMode = false;
            fabricCanvas.isEraserMode = false;
        }
        fabricCanvas.contextTop.globalCompositeOperation = "source-over";
    };

    useEffect(() => {
        if (!fabricCanvas) return;

        fabricCanvas.off("mouse:down");
        fabricCanvas.off("mouse:move");

        const handleMouseDown = (event) => {
            if (mode === "rect") {
                const pointer = fabricCanvas.getPointer(event.e);
                const rect = new fabric.Rect({
                    left: pointer.x,
                    top: pointer.y,
                    width: 100,
                    height: 100,
                    fill: hexToRgba(color, 0.3),
                    stroke: color,
                    strokeWidth: 2,
                });
                fabricCanvas.add(rect);
                setMode(null);
            } else if (mode === "circle") {
                const pointer = fabricCanvas.getPointer(event.e);
                const circle = new fabric.Circle({
                    left: pointer.x,
                    top: pointer.y,
                    radius: 50,
                    fill: hexToRgba(color, 0.3),
                    stroke: color,
                    strokeWidth: 2,
                });
                fabricCanvas.add(circle);
                setMode(null);
            } else if (mode === "text") {
                const pointer = fabricCanvas.getPointer(event.e);
                const text = new fabric.Textbox("Edit me", {
                    left: pointer.x,
                    top: pointer.y,
                    width: 150,
                    fontSize: 20,
                    fill: color,
                    editable: true,
                });
                fabricCanvas.add(text);
                setMode(null);
            } else if (mode === "emoji") {
                const pointer = fabricCanvas.getPointer(event.e);
                const emoji = new fabric.Textbox(selectedEmoji, {
                    left: pointer.x,
                    top: pointer.y,
                    width: 50,
                    fontSize: 50,
                    fill: color,
                    editable: false,
                });
                fabricCanvas.add(emoji);
                setMode(null);
            }
            fabricCanvas.renderAll();
        };

        const handleMouseMove = (options) => {
            if (mode === "pointer") {
                const pointerCoords = fabricCanvas.getPointer(options.e);
                if (!laserPointerRef.current) {
                    const pointer = new fabric.Circle({
                        left: pointerCoords.x,
                        top: pointerCoords.y,
                        radius: brushSize,
                        fill: color,
                        originX: "center",
                        originY: "center",
                        selectable: false,
                        evented: false,
                        opacity: 0.8,
                    });
                    fabricCanvas.add(pointer);
                    laserPointerRef.current = pointer;
                } else {
                    laserPointerRef.current.set({
                        left: pointerCoords.x,
                        top: pointerCoords.y,
                        radius: brushSize,
                        fill: color,
                    });
                }
                fabricCanvas.renderAll();
            }
        };

        if (mode === "pointer") {
            fabricCanvas.on("mouse:move", handleMouseMove);
        } else if (mode !== "draw" && mode !== "eraser") {
            fabricCanvas.on("mouse:down", handleMouseDown);
        }

        return () => {
            fabricCanvas.off("mouse:down", handleMouseDown);
            fabricCanvas.off("mouse:move", handleMouseMove);
            if (laserPointerRef.current) {
                fabricCanvas.remove(laserPointerRef.current);
                laserPointerRef.current = null;
            }
        };
    }, [fabricCanvas, mode, color, selectedEmoji, brushSize]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Delete") {
                const activeObject = fabricCanvas.getActiveObject();
                if (activeObject) {
                    fabricCanvas.remove(activeObject);
                    fabricCanvas.discardActiveObject();
                    fabricCanvas.renderAll();
                }
            }
        };

        if (fabricCanvas) {
            window.addEventListener("keydown", handleKeyDown);
            return () => {
                window.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [fabricCanvas]);

    const ToolButton = ({
        onClick,
        isActive,
        children,
        variant = "default",
    }) => {
        const variants = {
            default: isActive
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200",
            shapes: isActive
                ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200",
            drawing: isActive
                ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200",
            action: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700",
            danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700",
        };

        return (
            <button
                onClick={onClick}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${variants[variant]}`}
            >
                {children}
            </button>
        );
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Toolbox as a Left Sidebar */}
            <div
                className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-gray-200 shadow-lg transition-transform duration-300 ease-in-out overflow-y-auto ${
                    isToolboxVisible ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="py-6 px-6">
                    <div className="space-y-6">
                        {/* Shapes & Objects */}
                        <div>
                            <details>
                                <summary>
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="h-6 w-1 bg-purple-500 rounded-full"></div>
                                        <h3 className="font-semibold text-gray-800 hover:text-blue-500 hover:bg-gray-200 cursor-pointer transition-colors duration-200 px-2 py-1 rounded">
                                            Shapes & Objects
                                        </h3>
                                    </div>
                                </summary>
                                <div className="flex flex-wrap gap-3 border border-spacing-7 rounded-xl p-3">
                                    <ToolButton
                                        onClick={addRectangle}
                                        isActive={mode === "rect"}
                                        variant="shapes"
                                    >
                                        <Square />
                                        Rectangle
                                    </ToolButton>
                                    <ToolButton
                                        onClick={addCircle}
                                        isActive={mode === "circle"}
                                        variant="shapes"
                                    >
                                        <Circle />
                                        Circle
                                    </ToolButton>
                                    <ToolButton
                                        onClick={addText}
                                        isActive={mode === "text"}
                                        variant="shapes"
                                    >
                                        <Type />
                                        Text
                                    </ToolButton>
                                    <ToolButton
                                        onClick={addLaserPointer}
                                        isActive={mode === "pointer"}
                                        variant="shapes"
                                    >
                                        <MousePointer2 />
                                        Pointer
                                    </ToolButton>
                                </div>
                            </details>
                        </div>
                        {/* Drawing Tools */}
                        <div>
                            <details>
                                <summary>
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="h-6 w-1 bg-purple-500 rounded-full"></div>
                                        <h3 className="font-semibold text-gray-800 hover:text-blue-500 hover:bg-gray-200 cursor-pointer transition-colors duration-200 px-2 py-1 rounded">
                                            Drawing Tools
                                        </h3>
                                    </div>
                                </summary>
                                <div className="flex flex-wrap gap-3 border border-spacing-7 rounded-xl p-3">
                                    <ToolButton
                                        onClick={() => setDrawingMode("pencil")}
                                        isActive={
                                            mode === "draw" &&
                                            fabricCanvas?.freeDrawingBrush instanceof
                                                fabric.PencilBrush &&
                                            fabricCanvas?.freeDrawingBrush
                                                ?.width <= 10
                                        }
                                        variant="drawing"
                                    >
                                        <Brush />
                                        Pencil
                                    </ToolButton>
                                    <ToolButton
                                        onClick={() =>
                                            setDrawingMode("highlighter")
                                        }
                                        isActive={
                                            mode === "draw" &&
                                            fabricCanvas?.freeDrawingBrush instanceof
                                                fabric.PencilBrush &&
                                            fabricCanvas?.freeDrawingBrush
                                                ?.width > 10
                                        }
                                        variant="drawing"
                                    >
                                        <Highlighter />
                                        Highlighter
                                    </ToolButton>
                                    <ToolButton
                                        onClick={() => setDrawingMode("crayon")}
                                        isActive={
                                            mode === "draw" &&
                                            fabricCanvas?.freeDrawingBrush instanceof
                                                fabric.SprayBrush
                                        }
                                        variant="drawing"
                                    >
                                        <Brush />
                                        Crayon
                                    </ToolButton>
                                    <ToolButton
                                        onClick={disableModes}
                                        isActive={!mode}
                                        variant="default"
                                    >
                                        <RotateCcw />
                                        Select Mode
                                    </ToolButton>
                                </div>
                            </details>
                        </div>
                        {/* Emojis */}
                        <div>
                            <details>
                                <summary>
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="h-6 w-1 bg-yellow-500 rounded-full"></div>
                                        <h3 className="font-semibold text-gray-800 hover:text-blue-500 hover:bg-gray-200 cursor-pointer transition-colors duration-200 px-2 py-1 rounded">
                                            Emoticon
                                        </h3>
                                    </div>
                                </summary>
                                <div className="flex flex-wrap gap-2">
                                    {emojis.map((emoji) => (
                                        <button
                                            key={emoji}
                                            onClick={() =>
                                                handleEmojiChange(emoji)
                                            }
                                            className={`p-3 text-2xl rounded-xl transition-all duration-200 transform hover:scale-110 ${
                                                selectedEmoji === emoji &&
                                                mode === "emoji"
                                                    ? "bg-yellow-100 ring-2 ring-yellow-400 scale-110"
                                                    : "bg-white hover:bg-yellow-50 border border-gray-200"
                                            }`}
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                            </details>
                        </div>
                        {/* Controls */}
                        <div>
                            <details>
                                <summary>
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="h-6 w-1 bg-yellow-500 rounded-full"></div>
                                        <h3 className="font-semibold text-gray-800 hover:text-blue-500 hover:bg-gray-200 cursor-pointer transition-colors duration-200 px-2 py-1 rounded">
                                            Controls
                                        </h3>
                                    </div>
                                </summary>
                                <div className="flex flex-wrap items-center gap-6 border border-spacing-7 rounded-xl p-3">
                                    <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-200">
                                        <Palette />
                                        <label className="font-medium text-gray-700">
                                            Color:
                                        </label>
                                        <input
                                            type="color"
                                            value={color}
                                            onChange={handleColorChange}
                                            className="w-10 h-10 rounded-lg border-2 border-gray-300 cursor-pointer"
                                        />
                                    </div>
                                    <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-200">
                                        <label className="font-medium text-gray-700">
                                            Size:
                                        </label>
                                        <input
                                            type="range"
                                            min="1"
                                            max="50"
                                            value={brushSize}
                                            onChange={handleBrushSizeChange}
                                            className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                        />
                                        <span className="text-sm font-medium text-gray-600 w-8">
                                            {brushSize}
                                        </span>
                                    </div>
                                </div>
                            </details>
                            <div className="flex items-center mt-6 m-auto gap-3 border border-spacing-7 rounded-xl p-3 bg-white">
                                <ToolButton
                                    onClick={clearCanvas}
                                    variant="danger"
                                >
                                    <Trash2 />
                                </ToolButton>
                                <ToolButton
                                    onClick={saveCanvasAsImage}
                                    variant="action"
                                >
                                    <Download />
                                </ToolButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content (Canvas) and Toggle Button */}
            <div
                className={`flex-1 transition-all duration-300 ease-in-out ${
                    isToolboxVisible ? "ml-72" : "ml-0"
                }`}
            >
                {/* Toggle Button - Fixed Position */}
                <div className="fixed bottom-6 left-6 z-50">
                    <button
                        onClick={() => setIsToolboxVisible(!isToolboxVisible)}
                        className="flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                        title={isToolboxVisible ? "Hide Tools" : "Show Tools"}
                    >
                        <Settings />
                    </button>
                </div>

                {/* Canvas Container */}
                <div className="flex justify-center items-center py-8 px-6 min-h-screen bg-slate-700">
                    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 h-full">
                        <canvas
                            ref={canvasRef}
                            className="rounded-xl shadow-inner border border-gray-100"
                        />
                        {mode && (
                            <div className="mt-4 flex items-center justify-center">
                                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                                    {mode === "rect" &&
                                        "Click to add rectangle"}
                                    {mode === "circle" && "Click to add circle"}
                                    {mode === "text" && "Click to add text"}
                                    {mode === "emoji" && "Click to add emoji"}
                                    {mode === "draw" && "Draw on canvas"}
                                    {mode === "pointer" &&
                                        "Move mouse to point"}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .slider::-webkit-slider-thumb {
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #3b82f6;
                    cursor: pointer;
                    border: 2px solid white;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                }
                .slider::-moz-range-thumb {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #3b82f6;
                    cursor: pointer;
                    border: 2px solid white;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                }
                summary {
                    list-style: none; /* Hilangkan bullet/marker di beberapa browser */
                }

                summary::-webkit-details-marker {
                    display: none; /* Hilangkan marker di Chrome, Safari */
                }

                summary::marker {
                    display: none; /* Hilangkan marker di Firefox */
                }
            `}</style>
        </div>
    );
};

export default AnnotationCanvas;
