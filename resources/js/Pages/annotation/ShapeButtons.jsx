import ShapeButton from "./ButtonShape";

export default function ShapeButtons({ onAddShape }) {
    return (
        <div className="relative p-6 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Subtle background texture */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-4 right-6 w-1 h-1 bg-gray-400 rounded-full animate-pulse"></div>
                <div
                    className="absolute bottom-6 left-8 w-1 h-1 bg-blue-300 rounded-full animate-pulse"
                    style={{ animationDelay: "2s" }}
                ></div>
            </div>

            {/* Soft ambient glow */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-200 rounded-full blur-2xl opacity-20"></div>
            <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-slate-300 rounded-full blur-2xl opacity-20"></div>
        </div>
    );
}
