export default function ToolButton({ label, onClick, active }) {
    return (
        <button
            onClick={onClick}
            className={`relative px-3 py-2 rounded-lg border transition-all duration-300 ease-out
                       hover:scale-105 hover:-translate-y-0.5 active:scale-100 active:translate-y-0
                       text-sm font-medium shadow-sm hover:shadow-md
                       ${
                           active
                               ? "bg-blue-100 border-blue-200 text-blue-700 shadow-md"
                               : "bg-white border-gray-200 text-slate-700 hover:bg-gray-50 hover:border-blue-200"
                       }`}
        >
            <div
                className={`absolute inset-0 rounded-lg opacity-0 hover:opacity-30 transition-opacity duration-300
                           ${
                               active
                                   ? "bg-blue-200"
                                   : "bg-gradient-to-r from-blue-50 to-indigo-50"
                           }`}
            ></div>

            <span className="relative">{label}</span>
        </button>
    );
}
