import React, { useRef, useState, useCallback } from "react";
import axios from "axios";
import { Tldraw, createTLStore, loadSnapshot } from "tldraw";
import "tldraw/tldraw.css";
import LazyPdfFlipbook from "@/Components/LazyPdfFlipbook";

export default function Whiteboard() {
    const editorRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [isAnnotationMode, setIsAnnotationMode] = useState(true);
    const [pageStores, setPageStores] = useState({
        "page-1": createTLStore(),
    });
    const [currentPageId, setCurrentPageId] = useState("page-1");

    // Timeout status yang dapat dibersihkan
    let statusTimeout;
    const setTempStatus = useCallback((message, duration = 2000) => {
        if (statusTimeout) clearTimeout(statusTimeout);
        setStatus(message);
        statusTimeout = setTimeout(() => setStatus(""), duration);
    }, []);

    const handleMount = useCallback((editor) => {
        console.log("Editor mounted:", editor); // Debugging
        editorRef.current = editor;
    }, []);

    const saveBoard = async () => {
        if (!editorRef.current) {
            setTempStatus("Editor belum siap");
            return;
        }
        try {
            setLoading(true);
            setTempStatus("Menyimpan...");

            const allSnapshots = {};
            for (const [pageId, store] of Object.entries(pageStores)) {
                allSnapshots[pageId] = store.getSnapshot();
            }

            await axios.post("/drawings", {
                data: allSnapshots,
                title: "All Pages Drawing",
            });

            setTempStatus("Tersimpan ✅");
        } catch (e) {
            console.error("Gagal menyimpan:", e);
            setTempStatus(
                e.response?.status === 403
                    ? "Akses ditolak"
                    : "Gagal menyimpan ❌"
            );
        } finally {
            setLoading(false);
        }
    };

    const loadBoard = async () => {
        try {
            setLoading(true);
            setTempStatus("Memuat...");

            const { data } = await axios.get("/drawings");

            if (!data?.data) {
                setTempStatus("Belum ada data");
                return;
            }

            const snapshotData =
                typeof data.data === "string"
                    ? JSON.parse(data.data)
                    : data.data;

            if (typeof snapshotData !== "object" || !snapshotData) {
                setTempStatus("Data tidak valid");
                return;
            }

            const newStores = {};
            for (const [pageId, snapshot] of Object.entries(snapshotData)) {
                const store = createTLStore();
                if (snapshot) {
                    loadSnapshot(store, snapshot);
                }
                newStores[pageId] = store;
            }

            setPageStores(newStores);
            setTempStatus("Dimuat ✅");
        } catch (e) {
            console.error("Gagal memuat:", e);
            setTempStatus(
                e.response?.status === 403 ? "Akses ditolak" : "Gagal memuat ❌"
            );
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = useCallback(
        (newPageNumber) => {
            if (!Number.isInteger(newPageNumber) || newPageNumber < 1) {
                console.warn("Nomor halaman tidak valid:", newPageNumber);
                return;
            }

            const newPageId = `page-${newPageNumber}`;
            if (newPageId === currentPageId) return;

            console.log("Switching to page:", newPageId); // Debugging
            setPageStores((prev) => {
                const newStores = { ...prev };
                if (!newStores[newPageId]) {
                    newStores[newPageId] = createTLStore();
                }
                return newStores;
            });

            setCurrentPageId(newPageId);
            setTempStatus(`Berpindah ke Halaman ${newPageNumber}`, 1500);
        },
        [currentPageId, setTempStatus]
    );

    const toggleMode = useCallback(() => {
        setIsAnnotationMode((prev) => !prev);
    }, []);

    const tldrawClassName = `absolute inset-0 z-10 ${
        isAnnotationMode ? "pointer-events-auto" : "pointer-events-none"
    }`;

    const modeLabel = isAnnotationMode;

    return (
        <div className="w-screen h-screen flex flex-col">
            <div className="flex items-center gap-2 p-3 border-b bg-white">
                <button
                    onClick={saveBoard}
                    disabled={loading}
                    aria-label="Simpan semua coretan"
                    aria-disabled={loading}
                    className="px-4 py-2 rounded-xl bg-black text-white hover:opacity-90 disabled:opacity-50"
                >
                    Simpan Semua Coretan
                </button>
                <button
                    onClick={loadBoard}
                    disabled={loading}
                    aria-label="Muat coretan terakhir"
                    aria-disabled={loading}
                    className="px-4 py-2 rounded-xl border hover:bg-gray-100"
                >
                    Muat Coretan Terakhir
                </button>

                <span className="ml-3 text-sm text-gray-500">{status}</span>
                <span className="ml-5 text-sm font-medium text-gray-700">
                    {modeLabel}
                </span>
            </div>
            <div className="flex-1 relative bg-slate-200">
                <Tldraw
                    store={pageStores[currentPageId]}
                    onMount={handleMount}
                    className={tldrawClassName}
                    key={currentPageId} // Memaksa re-render saat halaman berubah
                />
            </div>
        </div>
    );
}
