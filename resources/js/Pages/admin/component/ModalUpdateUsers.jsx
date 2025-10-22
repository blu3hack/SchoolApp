import { Dialog } from "@headlessui/react";
import React, { useState, useEffect } from "react";

function ModalUpdateUsers({ open, onClose, onSubmit, data, setData, errors }) {
    const [selectedUser, setSelectedUser] = useState(null);
    return (
        <div>
            <Dialog open={open} onClose={onClose} className="relative z-50">
                {/* Backdrop */}
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm"
                    aria-hidden="true"
                />

                {/* Modal content wrapper */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                        <Dialog.Title className="text-lg font-bold mb-4">
                            Edit User
                        </Dialog.Title>

                        {selectedUser && (
                            <form
                                onSubmit={onSubmit}
                                className="space-y-4 max-w-md"
                            >
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Edit User (ID: {selectedUser.id})
                                    </label>
                                    <label className="block">Name</label>
                                    <input
                                        type="text"
                                        name="Nama"
                                        value={
                                            data?.Nama ??
                                            selectedUser?.Nama ??
                                            ""
                                        }
                                        onChange={(e) =>
                                            setData("Nama", e.target.value)
                                        }
                                        className="text-slate-800 border rounded w-full px-3 py-2"
                                    />
                                </div>

                                {/* Action buttons */}
                                <div className="flex justify-end space-x-2 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsUpdate(false)} // ✅ menutup modal
                                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Form content */}
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
}

export default ModalUpdateUsers;
