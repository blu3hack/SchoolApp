import ToolButton from "./ToolButton";
import ShapeButtons from "./ShapeButtons";
import ColorPicker from "./ColorPicker";
import BrushSizeSlider from "./BrushSizeSlider";

export default function Toolbar({
    activeTool,
    onToolChange,
    onAddShape,
    brushColor,
    setBrushColor,
    brushSize,
    setBrushSize,
}) {
    return (
        <div className="relative p-4 mb-6 bg-gradient-to-r from-slate-50 via-gray-50 to-blue-50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Subtle background texture */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-3 right-8 w-1 h-1 bg-gray-400 rounded-full animate-pulse"></div>
                <div
                    className="absolute bottom-4 left-12 w-1 h-1 bg-blue-300 rounded-full animate-pulse"
                    style={{ animationDelay: "2s" }}
                ></div>
            </div>

            {/* Soft ambient glow */}
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-blue-200 rounded-full blur-2xl opacity-20"></div>
            <div className="absolute -bottom-8 -left-8 w-14 h-14 bg-slate-300 rounded-full blur-2xl opacity-20"></div>

            <div className="relative flex flex-wrap items-center gap-4">
                {/* Tool Buttons Section */}
                <div className="flex items-center gap-2 p-2 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100">
                    <ToolButton
                        label="✏️ Pencil"
                        active={activeTool === "pencil"}
                        onClick={() => onToolChange("pencil")}
                    />
                    <ToolButton
                        label="🖍 Marker"
                        active={activeTool === "marker"}
                        onClick={() => onToolChange("marker")}
                    />
                    <ToolButton
                        label="🩹 Eraser"
                        active={activeTool === "eraser"}
                        onClick={() => onToolChange("eraser")}
                    />
                    <ToolButton
                        label="🔲 Select"
                        active={activeTool === "selection"}
                        onClick={() => onToolChange("selection")}
                    />
                </div>

                {/* Vertical Divider */}
                <div className="w-px h-8 bg-gray-200"></div>

                {/* Shape Buttons Section */}
                <div className="flex items-center">
                    <ShapeButtons onAddShape={onAddShape} />
                </div>

                {/* Vertical Divider */}
                <div className="w-px h-8 bg-gray-200"></div>

                {/* Settings Section */}
                <div className="flex items-center gap-3 p-2 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-600">
                            Color
                        </span>
                        <ColorPicker
                            value={brushColor}
                            onChange={setBrushColor}
                        />
                    </div>

                    <div className="w-px h-6 bg-gray-200"></div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-600">
                            Size
                        </span>
                        <BrushSizeSlider
                            value={brushSize}
                            onChange={setBrushSize}
                        />
                        <span className="text-xs text-slate-500 bg-gray-100 px-2 py-1 rounded-full min-w-[2rem] text-center">
                            {brushSize}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
