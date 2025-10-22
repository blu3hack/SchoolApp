import React, { useEffect, useRef, useState } from "react";
import * as pdfjs from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `/pdfjs/pdf.worker.mjs`;

export default function Draw() {
    const containerRef = useRef(null);
    const [modalUrl, setModalUrl] = useState(null);
    const PDF_URL = "/pdf/test_again.pdf";

    useEffect(() => {
        const loadPdf = async () => {
            const container = containerRef.current;
            container.innerHTML = "";

            const pdf = await pdfjs.getDocument(PDF_URL).promise;
            const scale = 1.5;

            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const viewport = page.getViewport({ scale });

                const pageWrapper = document.createElement("div");
                pageWrapper.className = "relative mb-5";
                pageWrapper.style.width = `${viewport.width}px`;
                pageWrapper.style.height = `${viewport.height}px`;

                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                canvas.style.display = "block";
                pageWrapper.appendChild(canvas);

                await page.render({ canvasContext: ctx, viewport }).promise;

                const annotations = await page.getAnnotations();
                annotations.forEach((ann) => {
                    if (ann.subtype === "Link" && ann.url) {
                        const rect = pdfjs.Util.normalizeRect(ann.rect);
                        const [x1, y1, x2, y2] = rect;
                        const x = x1 * scale;
                        const y = viewport.height - y2 * scale;
                        const width = (x2 - x1) * scale;
                        const height = (y2 - y1) * scale;

                        const link = document.createElement("div");
                        link.style.position = "absolute";
                        link.style.left = `${x}px`;
                        link.style.top = `${y}px`;
                        link.style.width = `${width}px`;
                        link.style.height = `${height}px`;
                        link.style.cursor = "pointer";
                        link.style.zIndex = 20;
                        link.style.backgroundColor = "rgba(255, 0, 0, 0)";

                        // Klik link -> tampilkan modal
                        link.onclick = () => setModalUrl(ann.url);

                        pageWrapper.appendChild(link);
                    }
                });

                container.appendChild(pageWrapper);
            }
        };

        loadPdf();
    }, []);

    return (
        <div className="relative">
            {/* Kontainer PDF */}
            <div
                ref={containerRef}
                className="w-full h-full overflow-y-auto bg-gray-50 p-10"
            ></div>

            {/* Modal */}
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
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
}
