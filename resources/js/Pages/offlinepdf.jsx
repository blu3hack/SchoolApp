import React, { useEffect, useState } from "react";

export default function PdfViewer() {
    const [pdfUrl, setPdfUrl] = useState(null);

    const openDB = () => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open("pdfDatabase", 1);

            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains("pdfs")) {
                    db.createObjectStore("pdfs");
                }
            };

            request.onsuccess = (e) => resolve(e.target.result);
            request.onerror = (e) => reject(e.target.error);
        });
    };

    const loadPDF = async () => {
        const db = await openDB();
        const tx = db.transaction("pdfs", "readonly");
        const store = tx.objectStore("pdfs");
        const request = store.get("Bahasa Indonesia_kelas6.pdf"); // ganti key ini sesuai key blob-mu

        request.onsuccess = (e) => {
            const blob = e.target.result;
            if (blob) {
                const url = URL.createObjectURL(blob);
                setPdfUrl(url);
            } else {
                console.log("Tidak ada PDF ditemukan di IndexedDB");
            }
        };
    };

    useEffect(() => {
        loadPDF();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl mb-4">PDF Viewer</h1>
            {pdfUrl ? (
                <iframe
                    src={pdfUrl}
                    width="100%"
                    height="600px"
                    title="PDF"
                    className="border"
                />
            ) : (
                <p>Sedang memuat PDF...</p>
            )}
        </div>
    );
}
