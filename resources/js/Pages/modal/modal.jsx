const ExcelUploadModal = ({ isOpen, setIsOpen, onSubmit }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        excelFile: null,
    });

    const handleFileUpload = (event) => {
        event.preventDefault();
        post("/dashboard/upload-excel", {
            onSuccess: () => {
                setIsOpen(false); // Close modal on successful upload
                reset(); // Reset form
            },
            onError: (errors) => {
                console.error("Upload failed:", errors);
            },
        });
    };

    return (
        isOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Upload File Excel
                    </h3>
                    <form onSubmit={handleFileUpload}>
                        <div className="mb-4">
                            <label
                                htmlFor="excelFile"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Pilih file Excel (.xlsx, .xls)
                            </label>
                            <input
                                type="file"
                                id="excelFile"
                                accept=".xlsx,.xls"
                                onChange={(e) =>
                                    setData("excelFile", e.target.files[0])
                                }
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            />
                            {errors.excelFile && (
                                <p className="text-red-500 text-sm mt-2">
                                    {errors.excelFile}
                                </p>
                            )}
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsOpen(false);
                                    reset();
                                }}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                                disabled={processing}
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                                disabled={processing}
                            >
                                {processing ? "Uploading..." : "Upload"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};
