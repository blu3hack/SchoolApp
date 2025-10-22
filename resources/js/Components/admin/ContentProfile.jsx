import React, { useState } from "react";

function ContentProfile({ isSidebarOpen }) {
    // State for user profile data
    const [formData, setFormData] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        bio: "Seorang administrator yang berdedikasi untuk menjaga sistem tetap berjalan lancar dan efisien.",
        profilePicture: "https://via.placeholder.com/150/0A58A7/FFFFFF?text=JD", // Placeholder image
    });

    // State for password change form
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    // Handle input changes for profile form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle input changes for password form
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
    };

    // Handle profile form submission
    const handleSubmitProfile = (e) => {
        e.preventDefault();
        console.log("Data profil diperbarui:", formData);
        // In a real application, you would send this data to your backend API
        alert("Profil berhasil diperbarui!");
    };

    // Handle password form submission
    const handleSubmitPassword = (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            alert("Kata sandi baru dan konfirmasi kata sandi tidak cocok!");
            return;
        }
        console.log("Data kata sandi:", passwordData);
        // In a real application, you would send this data to your backend API
        alert("Kata sandi berhasil diubah!");
        setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        });
    };

    return (
        <div
            className={`flex-1 p-8 transition-all duration-300 ${
                isSidebarOpen ? "ml-64" : "ml-16"
            } bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen`}
        >
            <h1 className="text-4xl font-extrabold text-indigo-900 mb-8 tracking-tight drop-shadow-sm">
                Pengaturan Profil Anda
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Profile Information Card */}
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-blue-200">
                    <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center">
                        <svg
                            className="w-7 h-7 mr-3 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                        Informasi Profil
                    </h2>
                    <form onSubmit={handleSubmitProfile} className="space-y-6">
                        <div className="flex flex-col items-center mb-6">
                            <img
                                src={formData.profilePicture}
                                alt="Profil Pengguna"
                                className="w-32 h-32 rounded-full object-cover border-4 border-blue-300 shadow-md"
                            />
                            <button
                                type="button"
                                className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
                            >
                                Unggah Foto Baru
                            </button>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Alamat Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Bio Anda
                            </label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                rows="3"
                                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 resize-y"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg transform hover:scale-[1.01]"
                        >
                            Simpan Perubahan Profil
                        </button>
                    </form>
                </div>

                {/* Change Password Card */}
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-200">
                    <h2 className="text-2xl font-bold text-red-700 mb-6 flex items-center">
                        <svg
                            className="w-7 h-7 mr-3 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 7a2 2 0 012 2v5a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2h6zM7 9H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2h-2m-4-2h.01"
                            />
                        </svg>
                        Ubah Kata Sandi
                    </h2>
                    <form onSubmit={handleSubmitPassword} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Kata Sandi Saat Ini
                            </label>
                            <input
                                type="password"
                                name="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent text-gray-800"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Kata Sandi Baru
                            </label>
                            <input
                                type="password"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent text-gray-800"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Konfirmasi Kata Sandi Baru
                            </label>
                            <input
                                type="password"
                                name="confirmNewPassword"
                                value={passwordData.confirmNewPassword}
                                onChange={handlePasswordChange}
                                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent text-gray-800"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-lg transform hover:scale-[1.01]"
                        >
                            Ubah Kata Sandi
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContentProfile;
