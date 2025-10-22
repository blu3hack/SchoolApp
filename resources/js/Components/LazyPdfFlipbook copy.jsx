import React, { useEffect, useRef, useState } from "react";
import { usePage } from "@inertiajs/react";
import { PageFlip } from "page-flip";
import * as pdfjs from "pdfjs-dist";
import { Book, Loader2, Edit3, Eye, Save, Download } from "lucide-react";
import { Tldraw, createTLStore, defaultShapeUtils, loadSnapshot } from "tldraw";
import "tldraw/tldraw.css";
import axios from "axios";

// Atur worker PDF.js secara global
pdfjs.GlobalWorkerOptions.workerSrc = `/pdfjs/pdf.worker.mjs`;

const PdfFlipbook = () => {
    // --- State dan Ref yang Diperbarui ---
    const bookRef = useRef(null);
    const pdfDocumentRef = useRef(null);
    const [pageFlipInstance, setPageFlipInstance] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [error, setError] = useState(null);
    const [isAnnotationMode, setIsAnnotationMode] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [pdfDimensions, setPdfDimensions] = useState({ width: 0, height: 0 });
    const [tldrawStores, setTldrawStores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadedSnapshots, setLoadedSnapshots] = useState(null);
    const [isToggleOpen, setIsToggleOpen] = useState(false);

    // Zoom & Search state
    const [scale, setScale] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchMatches, setSearchMatches] = useState([]);
    const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

    const props = usePage().props;
    const PDF_URL = `/pdf/${props.file_pdf}`;

    // --- Fungsi Utama dan Handler ---

    // Fungsi untuk merender ulang halaman dengan skala baru
    const renderPage = async (pdf, pageNum, currentScale) => {
        if (!bookRef.current || pageNum < 1 || pageNum > pdf.numPages) return;

        const pageWrapper = bookRef.current.querySelector(
            `[data-page-number="${pageNum}"]`
        );
        const canvas = pageWrapper?.querySelector("canvas");

        if (!canvas) return;

        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: currentScale });

        // Tambahkan DPR untuk rendering yang lebih tajam
        const dpr = window.devicePixelRatio || 1;
        canvas.width = viewport.width * dpr;
        canvas.height = viewport.height * dpr;
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;

        const renderContext = {
            canvasContext: canvas.getContext("2d"),
            transform: [dpr, 0, 0, dpr, 0, 0],
            viewport,
        };
        await page.render(renderContext).promise;
        page.cleanup();
    };

    // Fungsi utama untuk memuat dan merender PDF
    // --- Fungsi baru untuk render halaman yang terlihat ---
    const renderVisiblePages = async (pdf, pageNums, currentScale) => {
        if (!bookRef.current) return;
        for (const pageNum of pageNums) {
            if (pageNum < 1 || pageNum > pdf.numPages) continue;
            const pageWrapper = bookRef.current.querySelector(
                `[data-page-number="${pageNum}"]`
            );
            if (!pageWrapper) continue;

            // Jika canvas belum ada, buat & render
            if (!pageWrapper.querySelector("canvas")) {
                const pdfCanvas = document.createElement("canvas");
                pdfCanvas.className = "page";
                pageWrapper.appendChild(pdfCanvas);
                await renderPage(pdf, pageNum, currentScale);
            }
        }
    };

    // --- Fungsi utama untuk memuat PDF ---
    const renderPdf = async () => {
        setIsLoading(true);
        setError(null);
        if (!bookRef.current) {
            setError("Wadah buku belum dimuat.");
            setIsLoading(false);
            return;
        }

        try {
            const loadingTask = pdfjs.getDocument(PDF_URL);
            const pdf = await loadingTask.promise;
            pdfDocumentRef.current = pdf;

            const numPages = pdf.numPages;
            const firstPage = await pdf.getPage(1);
            const baseViewport = firstPage.getViewport({ scale: 1 });
            const pagesPerView = isMobile ? 1 : 2;
            const fitScale =
                window.innerWidth / (baseViewport.width * pagesPerView);
            const initialRenderScale = Math.min(2, fitScale);
            const viewport = firstPage.getViewport({
                scale: initialRenderScale,
            });

            setPdfDimensions({
                width: viewport.width,
                height: viewport.height,
            });
            firstPage.cleanup();

            const pagesContainer = bookRef.current;
            pagesContainer.innerHTML = "";

            // Buat wrapper kosong untuk semua halaman (tanpa canvas)
            for (let i = 1; i <= numPages; i++) {
                const pageWrapper = document.createElement("div");
                pageWrapper.className = "page-wrapper";
                pageWrapper.style.position = "relative";
                pageWrapper.style.width = `${viewport.width}px`;
                pageWrapper.style.height = `${viewport.height}px`;
                pageWrapper.setAttribute("data-page-number", i);
                pagesContainer.appendChild(pageWrapper);
            }

            // Render halaman pertama + preload halaman 2 (lazy load awal)
            await renderVisiblePages(pdf, [1, 2], initialRenderScale);

            const pageFlip = new PageFlip(pagesContainer, {
                width: viewport.width,
                height: viewport.height,
                showCover: true,
                flippingTime: 800,
                size: "fixed",
                usePortrait: isMobile,
                autoSize: false,
                useMouseEvents: true,
                useTouchEvents: true,
            });

            pageFlip.loadFromHTML(
                pagesContainer.querySelectorAll(".page-wrapper")
            );

            // Event flip → lazy load halaman aktif & tetangga
            pageFlip.on("flip", async (e) => {
                const current = e.data + 1; // halaman aktif
                const toRender = [current - 1, current, current + 1].filter(
                    (n) => n >= 1 && n <= numPages
                );
                await renderVisiblePages(pdf, toRender, initialRenderScale);
                setCurrentPage(current);
            });

            setPageFlipInstance(pageFlip);

            // Inisialisasi Tldraw store
            const stores = [];
            for (let i = 0; i < Math.ceil(numPages / 2); i++) {
                stores.push(createTLStore({ shapeUtils: defaultShapeUtils }));
            }
            setTldrawStores(stores);

            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setError("Gagal memuat PDF. Silakan periksa file atau coba lagi.");
            setIsLoading(false);
        }
    };

    // --- Efek Samping (useEffect) ---

    // Resize listener
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Muat PDF saat pertama kali render atau saat isMobile berubah
    useEffect(() => {
        renderPdf();
        return () => {
            if (pageFlipInstance) {
                pageFlipInstance.destroy();
                if (bookRef.current) bookRef.current.innerHTML = "";
                setPageFlipInstance(null);
            }
        };
    }, [isMobile]);

    // Render ulang halaman saat scale berubah
    useEffect(() => {
        if (!pageFlipInstance || !pdfDocumentRef.current) return;
        const timeout = setTimeout(() => {
            const activePage = pageFlipInstance.getCurrentPageId();
            const pagesToRender = isMobile
                ? [activePage]
                : [activePage, activePage + 1];

            pagesToRender.forEach((pageNum) =>
                renderPage(pdfDocumentRef.current, pageNum, scale)
            );
        }, 200);

        return () => clearTimeout(timeout);
    }, [scale, pageFlipInstance, isMobile]);

    // --- Fungsi Handler ---

    const toggleAnnotationMode = () => setIsAnnotationMode((prev) => !prev);
    const saveBoard = async () => {
        try {
            setLoading(true);
            const allSnapshots = {};
            tldrawStores.forEach((store, idx) => {
                allSnapshots[`store-${idx}`] = store.getSnapshot();
            });
            await axios.post("/drawings", {
                data: allSnapshots,
                title: "All Pages Drawing",
            });
            alert("Annotation berhasil disimpan!");
            setIsToggleOpen(false);
        } catch (e) {
            console.error("Gagal menyimpan:", e);
            alert("Gagal menyimpan annotation.");
        } finally {
            setLoading(false);
        }
    };

    const loadBoard = async () => {
        try {
            setLoading(true);
            const res = await axios.get("/drawings");
            const allSnapshots = res.data?.data;
            if (!allSnapshots) {
                alert("Tidak ada annotation yang tersimpan.");
                return;
            }
            setLoadedSnapshots(allSnapshots);
            alert("Annotation berhasil dimuat!");
            setIsToggleOpen(false);
        } catch (e) {
            console.error("Gagal memuat annotation:", e);
            alert("Gagal memuat annotation.");
        } finally {
            setLoading(false);
        }
    };

    // Zoom handlers yang hanya mengubah state `scale`
    const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.1, 3));
    const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));

    // Search handlers
    const handleSearch = async () => {
        if (!pdfDocumentRef.current || !searchQuery) return;
        try {
            const pdf = pdfDocumentRef.current;
            const matches = [];

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items
                    .map((it) => it.str)
                    .join(" ");
                if (
                    pageText.toLowerCase().includes(searchQuery.toLowerCase())
                ) {
                    matches.push(i);
                }
                page.cleanup();
            }

            setSearchMatches(matches);
            setCurrentMatchIndex(0);

            if (matches.length > 0 && pageFlipInstance) {
                pageFlipInstance.flip(matches[0]);
            }
        } catch (err) {
            console.error("Error search:", err);
        }
    };

    const nextMatch = () => {
        if (searchMatches.length === 0) return;
        const nextIndex = (currentMatchIndex + 1) % searchMatches.length;
        setCurrentMatchIndex(nextIndex);
        if (pageFlipInstance) pageFlipInstance.flip(searchMatches[nextIndex]);
    };

    // --- Markup (JSX) ---

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-transparent p-1 relative">
            {/* Control buttons */}
            {!isLoading && !error && (
                <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-3">
                    {/* Toggle Save/Load/Tools */}
                    <div className="relative z-auto">
                        {isToggleOpen && (
                            <div className="absolute bottom-full right-0 mb-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                                {/* Save */}
                                <button
                                    onClick={saveBoard}
                                    disabled={loading}
                                    className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 disabled:opacity-50"
                                >
                                    <Save className="h-4 w-4 text-green-600" />
                                    <span className="text-sm text-gray-700">
                                        Simpan Semua Coretan
                                    </span>
                                </button>
                                <div className="border-t border-gray-100"></div>

                                {/* Load */}
                                <button
                                    onClick={loadBoard}
                                    disabled={loading}
                                    className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 disabled:opacity-50"
                                >
                                    <Download className="h-4 w-4 text-blue-600" />
                                    <span className="text-sm text-gray-700">
                                        Muat Coretan Terakhir
                                    </span>
                                </button>
                                {/* Zoom */}
                                <div className="border-t border-gray-100"></div>
                                <div className="flex items-center justify-between px-4 py-2">
                                    <button
                                        onClick={handleZoomOut}
                                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                                    >
                                        -
                                    </button>
                                    <span className="text-sm">Zoom</span>
                                    <button
                                        onClick={handleZoomIn}
                                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                                    >
                                        +
                                    </button>
                                </div>
                                {/* Search */}
                                <div className="border-t border-gray-100"></div>
                                <div className="px-4 py-2 flex space-x-2 items-center">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        placeholder="Cari teks..."
                                        className="w-full border px-2 py-1 text-sm rounded"
                                    />
                                    <button
                                        onClick={handleSearch}
                                        className="px-2 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                                    >
                                        Go
                                    </button>
                                </div>
                                {searchMatches.length > 0 && (
                                    <div className="px-4 pb-2 flex justify-between items-center">
                                        <span className="text-xs text-gray-600">
                                            {currentMatchIndex + 1}/
                                            {searchMatches.length}
                                        </span>
                                        <button
                                            onClick={nextMatch}
                                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-xs"
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                        <button
                            onClick={() => setIsToggleOpen(!isToggleOpen)}
                            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white shadow-lg transition-all duration-300"
                            title="Options"
                        >
                            <Save className="h-4 w-4" />
                        </button>
                    </div>
                    {/* Toggle annotation mode */}
                    <button
                        onClick={toggleAnnotationMode}
                        className={`flex items-center px-4 py-2 rounded-full shadow-lg transition-all duration-300 ${
                            isAnnotationMode
                                ? "bg-blue-500 hover:bg-blue-600 text-white"
                                : "bg-gray-500 hover:bg-gray-600 text-white"
                        }`}
                        title={
                            isAnnotationMode ? "Mode Lihat" : "Mode Annotation"
                        }
                    >
                        {isAnnotationMode ? (
                            <Edit3 className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
                        )}
                    </button>
                </div>
            )}
            {/* Loading */}
            {isLoading && !error && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="mb-1 p-4 bg-white rounded-lg shadow-md">
                        <div className="flex items-center justify-center space-x-3 text-blue-600">
                            <Loader2 className="animate-spin h-6 w-6" />
                            <Book className="h-6 w-6" />
                            <span className="text-lg font-medium">
                                Open Ebook (Proses akan Lebih lama saat pertama
                                kali membuka)...
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Tampilkan pesan error dan tombol reload */}
            {error && (
                <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
                    <div className="p-6 bg-white rounded-lg shadow-xl text-center">
                        <div className="text-xl font-bold text-red-600 mb-2">
                            Oups, ada yang salah! 😟
                        </div>
                        <p className="text-gray-700 mb-4">{error}</p>
                        <button
                            onClick={renderPdf}
                            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
                        >
                            Coba Muat Ulang
                        </button>
                    </div>
                </div>
            )}

            {/* TLDRAW */}
            {/* PDF Flipbook */}
            {isAnnotationMode &&
                tldrawStores.map((store, index) => {
                    const leftPage = index * 2 + 1;
                    const rightPage = leftPage + 1;
                    const isActive =
                        currentPage === leftPage || currentPage === rightPage;
                    if (!isActive) return null;

                    const snapshot = loadedSnapshots?.[`store-${index}`];

                    return (
                        <div
                            key={index}
                            className="fixed inset-0 z-10 pointer-events-auto"
                            style={{
                                width: "100vw",
                                height: "100vh",
                            }}
                        >
                            <Tldraw
                                store={store}
                                onMount={() => {
                                    if (snapshot) loadSnapshot(store, snapshot);
                                }}
                            />
                        </div>
                    );
                })}
            <div className="relative flex justify-center">
                <div
                    style={{
                        transform: `scale(${scale})`,
                        transformOrigin: "center center",
                        transition: "transform 0.2s ease-in-out",
                    }}
                >
                    <div
                        ref={bookRef}
                        className="book-container shadow-2xl transition-shadow duration-300 ease-in-out overflow-auto rounded-3xl"
                    />
                </div>
            </div>
        </div>
    );
};
export default PdfFlipbook;
