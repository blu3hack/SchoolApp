import React, { useEffect, useRef, useState } from "react";
import * as pdfjs from "pdfjs-dist";
import HTMLFlipBook from "react-pageflip";
import "pdfjs-dist/web/pdf_viewer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `/pdfjs/pdf.worker.mjs`;

export default function Draw() {
    const containerRef = useRef(null);
    const [modalUrl, setModalUrl] = useState(null);
    const [pdfDoc, setPdfDoc] = useState(null);
    const [pageImages, setPageImages] = useState([]);
    const [pageLinks, setPageLinks] = useState([]);
    const [pdfSize, setPdfSize] = useState({ width: 800, height: 1000 });

    const PDF_URL = "/pdf/test_again.pdf";

    // 1️⃣ Muat PDF
    useEffect(() => {
        const loadPdf = async () => {
            try {
                const pdf = await pdfjs.getDocument(PDF_URL).promise;

                // Ambil ukuran asli dari halaman pertama PDF
                const firstPage = await pdf.getPage(1);
                const viewport = firstPage.getViewport({ scale: 1 });
                let { width, height } = viewport;

                // Skala agar muat di layar (maks 90% lebar layar)
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

    // 2️⃣ Render halaman dan link
    useEffect(() => {
        if (!pdfDoc) return;

        const scale = 1;
        const tempImages = [];
        const tempLinks = [];

        const renderPageToImage = async (pageNum) => {
            const page = await pdfDoc.getPage(pageNum);
            const viewport = page.getViewport({ scale });

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await page.render({ canvasContext: ctx, viewport }).promise;

            // Simpan gambar halaman
            const imageData = canvas.toDataURL("image/png");
            tempImages.push({
                src: imageData,
                width: viewport.width,
                height: viewport.height,
            });

            // Ambil anotasi link
            const annotations = await page.getAnnotations();
            const links = annotations
                .filter((ann) => ann.subtype === "Link")
                .map((ann) => {
                    const rect = ann.rect; // [x1, y1, x2, y2] PDF space
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
        };

        processAllPages();
    }, [pdfDoc]);

    // 3️⃣ Render flipbook
    return (
        <div className="relative bg-gray-50 min-h-screen flex flex-col items-center justify-center p-10">
            {pageImages.length > 0 ? (
                <HTMLFlipBook
                    width={pdfSize.width}
                    height={pdfSize.height}
                    showCover={true}
                    maxShadowOpacity={0.5}
                    className="shadow-2xl"
                    style={{ backgroundColor: "#f9fafb" }}
                    ref={containerRef}
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
                                        backgroundColor: "rgba(0, 0, 255, 0.1)", // transparan (bisa dihapus)
                                        zIndex: 10,
                                    }}
                                    onClick={async () => {
                                        if (link.url) {
                                            setModalUrl(link.url);
                                        } else if (link.dest && pdfDoc) {
                                            const dest =
                                                await pdfDoc.getDestination(
                                                    link.dest
                                                );
                                            const targetPageNum =
                                                (await pdfDoc.getPageIndex(
                                                    dest[0]
                                                )) + 1;
                                            const flip =
                                                containerRef.current.pageFlip();
                                            flip.flip(targetPageNum - 1);
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

            {/* 4️⃣ Modal Viewer */}
            {modalUrl && (
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
