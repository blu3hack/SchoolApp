import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Dialog } from "@headlessui/react";

export default function ImportUsersModal() {
    const [isOpen, setIsOpen] = useState(false);

    const { data, setData, post, progress, errors, reset } = useForm({
        file: null,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("users.import"), {
            forceFormData: true, // wajib untuk file upload
            onSuccess: () => {
                reset();
                setIsOpen(false); // tutup modal setelah sukses
            },
        });
    };

    return (
        <div>
            {/* Tombol buka modal */}
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
                Upload Excel
            </button>

            {/* Modal */}
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
                        <Dialog.Title className="text-lg font-bold mb-4">
                            Upload Excel
                        </Dialog.Title>

                        <form onSubmit={submit} className="space-y-4">
                            <input
                                type="file"
                                accept=".xlsx,.xls,.csv"
                                onChange={(e) =>
                                    setData("file", e.target.files[0])
                                }
                                className="block w-full border border-gray-300 rounded p-2"
                            />

                            {errors.file && (
                                <div className="text-red-500 text-sm">
                                    {errors.file}
                                </div>
                            )}

                            {progress && (
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className="bg-blue-600 h-2.5 rounded-full"
                                        style={{
                                            width: `${progress.percentage}%`,
                                        }}
                                    ></div>
                                </div>
                            )}

                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                >
                                    Upload
                                </button>
                            </div>
                        </form>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
}
