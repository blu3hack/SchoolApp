import React, { useEffect, useRef, useState, useCallback } from "react";
import * as pdfjs from "pdfjs-dist";
import HTMLFlipBook from "react-pageflip";
import { Tldraw, createTLStore, defaultShapeUtils } from "tldraw";
import "pdfjs-dist/web/pdf_viewer.css";
import "tldraw/tldraw.css";

pdfjs.GlobalWorkerOptions.workerSrc = `/pdfjs/pdf.worker.mjs`;

export default function Draw() {
    const containerRef = useRef(null);
    const [modalUrl, setModalUrl] = useState(null);
    const [pdfDoc, setPdfDoc] = useState(null);
    const [pageImages, setPageImages] = useState([]);
    const [pageLinks, setPageLinks] = useState([]);
    const [pdfSize, setPdfSize] = useState({ width: 800, height: 1000 });

    // States Baru untuk mengelola Tldraw tunggal dan datanya
    const [tldrawStore] = useState(() =>
        createTLStore({ shapeUtils: defaultShapeUtils })
    );
    // Map: Key = page index (0-based), Value = Tldraw Snapshot (data gambar)
    const [tldrawPageData, setTldrawPageData] = useState(new Map());
    const [currentPage, setCurrentPage] = useState(0); // Index halaman saat ini (0-based)
    const PDF_URL = "/pdf/canva.pdf";

    // 1️⃣ Muat PDF
    useEffect(() => {
        const loadPdf = async () => {
            try {
                const pdf = await pdfjs.getDocument(PDF_URL).promise;
                const firstPage = await pdf.getPage(1);
                const viewport = firstPage.getViewport({ scale: 1 });
                let { width, height } = viewport;

                const maxWidth = window.innerWidth * 0.9;
                if (width > maxWidth) {
                    const ratio = maxWidth / width;
                    width *= ratio;
                    height *= ratio;
                }

                setPdfSize({ width, height });
                setPdfDoc(pdf);
                firstPage.cleanup();
            } catch (err) {
                console.error("Error loading PDF:", err);
            }
        };
        loadPdf();
    }, []);

    // 2️⃣ Render halaman dan link & Inisialisasi Data Tldraw
    useEffect(() => {
        if (!pdfDoc) return;

        const scale = 1;
        const tempImages = [];
        const tempLinks = [];

        const renderPageToImage = async (pageNum) => {
            const page = await pdfDoc.getPage(pageNum);
            const viewport = page.getViewport({ scale });

            // ... (Kode rendering gambar PDF dan link tetap sama) ...
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await page.render({ canvasContext: ctx, viewport }).promise;

            const imageData = canvas.toDataURL("image/png");
            tempImages.push({
                src: imageData,
                width: viewport.width,
                height: viewport.height,
            });

            const annotations = await page.getAnnotations();
            const links = annotations
                .filter((ann) => ann.subtype === "Link")
                .map((ann) => {
                    const rect = ann.rect;
                    const [x1, y1, x2, y2] =
                        viewport.convertToViewportRectangle(rect);

                    const left = Math.min(x1, x2);
                    const top = Math.min(y1, y2);
                    const width = Math.abs(x2 - x1);
                    const height = Math.abs(y2 - y1);

                    return {
                        x: left,
                        y: top,
                        width,
                        height,
                        url: ann.url || null,
                        dest: ann.dest || null,
                    };
                });
            tempLinks.push(links);
        };

        const processAllPages = async () => {
            for (let i = 1; i <= pdfDoc.numPages; i++) {
                await renderPageToImage(i);
            }
            setPageImages(tempImages);
            setPageLinks(tempLinks);

            // 🛑 PERBAIKAN: Dapatkan snapshot kosong yang valid
            // Kita perlu mengambil snapshot awal yang valid dari store
            // sebelum dimuat dengan shapes apa pun.
            const initialEmptySnapshot = tldrawStore.getSnapshot();

            const initialPageData = new Map();
            for (let i = 0; i < pdfDoc.numPages; i++) {
                // Simpan snapshot yang valid, bukan hanya objek kosong {}
                initialPageData.set(i, initialEmptySnapshot);
            }
            setTldrawPageData(initialPageData);

            // Muat ulang data halaman pertama (sebenarnya tidak perlu,
            // tapi memastikan store dalam keadaan awal yang benar)
            try {
                tldrawStore.loadSnapshot(initialEmptySnapshot);
            } catch (error) {
                console.error("Error loading initial Tldraw snapshot:", error);
            }
        };

        processAllPages();
    }, [pdfDoc, tldrawStore]);

    // 🆕 Logika Menyimpan/Memuat data Tldraw saat membalik halaman
    const handleFlip = useCallback(
        (e) => {
            const newPage = e.data; // Index halaman baru (0-based)
            const oldPage = currentPage;

            if (tldrawStore) {
                // 1. Simpan data halaman lama
                const snapshot = tldrawStore.getSnapshot();

                setTldrawPageData((prevData) => {
                    const newData = new Map(prevData);
                    if (newData.has(oldPage)) {
                        newData.set(oldPage, snapshot);
                    }
                    return newData;
                });

                // 2. Muat data halaman baru
                // 🛑 PERBAIKAN: Gunakan snapshot yang valid, jika tidak ada,
                // ambil snapshot kosong yang terakhir disimpan.
                const nextPageData =
                    tldrawPageData.get(newPage) ||
                    tldrawPageData.get(0) ||
                    tldrawStore.getSnapshot();

                // Atur ulang store dengan data halaman baru
                try {
                    tldrawStore.loadSnapshot(nextPageData);
                } catch (error) {
                    console.log(
                        "Error loading Tldraw snapshot. Resetting store.",
                        error
                    );
                    // Fallback: hapus semua shapes
                    tldrawStore.clear();
                }
            }

            setCurrentPage(newPage);
        },
        [currentPage, tldrawStore, tldrawPageData]
    );

    // 🆕 State untuk mode menggambar
    const [isDrawingMode, setIsDrawingMode] = useState(false);

    // ... (Fungsi useEffect dan handleFlip yang sudah ada) ...

    // 🆕 Fungsi toggle
    const toggleDrawingMode = () => {
        setIsDrawingMode((prev) => !prev);
    };

    // 3️⃣ Render flipbook dan overlay Tldraw
    return (
        <div className="relative bg-gray-600 min-h-screen flex flex-col items-center justify-center p-10">
            {/* 🆕 Tombol Toggle Tldraw */}
            <button
                onClick={toggleDrawingMode}
                className={`absolute top-4 right-4 p-3 rounded-full shadow-lg font-bold text-white transition-colors duration-200 z-30 ${
                    isDrawingMode
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                }`}
            >
                {isDrawingMode ? "🚫" : "✏️"}
            </button>
            {pageImages.length > 0 ? (
                // ... (HTMLFlipBook dan kontennya sama)
                <HTMLFlipBook
                    width={pdfSize.width}
                    height={pdfSize.height}
                    showCover={true}
                    maxShadowOpacity={0.5}
                    className="shadow-2xl"
                    style={{ backgroundColor: "#f9fafb" }}
                    ref={containerRef}
                    clickEventForward={false}
                    onFlip={handleFlip}
                >
                    {pageImages.map((page, idx) => (
                        <div
                            key={idx}
                            className="relative flex items-center justify-center bg-white"
                            style={{
                                width: page.width,
                                height: page.height,
                            }}
                        >
                            {/* Gambar halaman PDF */}
                            <img
                                src={page.src}
                                alt={`Page ${idx + 1}`}
                                width={page.width}
                                height={page.height}
                                style={{
                                    display: "block",
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                }}
                            />

                            {/* Area link transparan */}
                            {pageLinks[idx]?.map((link, i) => (
                                <div
                                    key={i}
                                    style={{
                                        position: "absolute",
                                        left: `${link.x}px`,
                                        top: `${link.y}px`,
                                        width: `${link.width}px`,
                                        height: `${link.height}px`,
                                        cursor: "pointer",
                                        backgroundColor: "rgba(0, 0, 255, 0.1)",
                                        zIndex: 9999,
                                        pointerEvents: "auto",
                                    }}
                                    onMouseDown={(e) => e.stopPropagation()}
                                    onMouseUp={(e) => e.stopPropagation()}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        if (link.url) {
                                            setModalUrl(link.url);
                                        }
                                    }}
                                ></div>
                            ))}
                        </div>
                    ))}
                </HTMLFlipBook>
            ) : (
                <div className="text-gray-400 text-lg">Memuat PDF...</div>
            )}

            {/* 🧩 Lapisan kanvas Tldraw tunggal sebagai overlay di atas flipbook */}
            {tldrawStore && pageImages.length > 0 && (
                <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ padding: "2.5rem" }}
                >
                    <div
                        className="relative"
                        style={{
                            width: pdfSize.width * 1.9,
                            height: pdfSize.height,
                            pointerEvents: "auto",
                            pointerEvents: isDrawingMode ? "auto" : "none",
                            zIndex: isDrawingMode ? 20 : -1,
                            backgroundColor: "transparent",
                        }}
                    >
                        <Tldraw
                            store={tldrawStore} // Store tunggal
                            autoFocus={false}
                        />
                    </div>
                </div>
            )}

            {/* 4️⃣ Modal Viewer */}
            {modalUrl && (
                // ... (Modal Viewer sama)
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-white w-11/12 md:w-3/4 lg:w-1/2 h-3/4 rounded-2xl shadow-xl relative">
                        <button
                            onClick={() => setModalUrl(null)}
                            className="absolute top-2 right-3 text-gray-600 hover:text-black text-2xl font-bold"
                        >
                            &times;
                        </button>
                        <iframe
                            src={modalUrl}
                            title="PDF Link Content"
                            className="w-full h-full rounded-2xl"
                            sandbox="allow-same-origin allow-scripts allow-popups"
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
}
