// src/components/Header.js

function Header() {
    return (
        <div className="flex items-center justify-between border-b border-white/20 bg-white/10 p-4 shadow-md backdrop-blur-lg">
            <h2 className="text-xl font-semibold text-slate-300">
                Dashboard Overview
            </h2>
            <div className="flex items-center space-x-4">
                <span className="font-medium text-slate-300">Admin User</span>
                <button className="rounded-lg bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 text-white transition-all duration-300 hover:from-red-600 hover:to-pink-600">
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Header;
