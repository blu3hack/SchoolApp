// ShapeButton.jsx
export default function ShapeButton({
    label,
    icon,
    color,
    gradientFrom,
    gradientTo,
    onClick,
}) {
    return (
        <button onClick={onClick} className="group relative overflow-hidden">
            <div
                className={`relative flex flex-col items-center gap-2 px-6 py-5 
                            bg-white hover:bg-gray-50
                            border border-gray-200 hover:border-${color}-200
                            rounded-xl shadow-sm hover:shadow-lg
                            transition-all duration-300 ease-out
                            hover:scale-105 hover:-translate-y-1
                            active:scale-100 active:translate-y-0`}
            >
                <div
                    className={`absolute inset-0 bg-gradient-to-r from-${gradientFrom} to-${gradientTo} opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-xl`}
                ></div>

                {icon && (
                    <div className="relative text-4xl group-hover:scale-110 transition-transform duration-300">
                        <span
                            className={`text-slate-600 group-hover:text-${color}-600 transition-colors duration-300`}
                        >
                            {icon}
                        </span>
                    </div>
                )}

                <span
                    className={`relative text-sm font-medium text-slate-700 group-hover:text-${color}-700 transition-colors duration-300`}
                >
                    {label}
                </span>
            </div>
        </button>
    );
}
