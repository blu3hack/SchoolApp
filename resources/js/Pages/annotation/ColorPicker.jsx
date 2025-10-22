export default function ColorPicker({ value, onChange }) {
    return (
        <div className="relative inline-block group">
            {/* Subtle background glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>

            <input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
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
    );
}
