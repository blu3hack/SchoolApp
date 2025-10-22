import React, { useEffect, useState } from "react";

function InsertDB() {
    const [tokens, setTokens] = useState([]);

    // ==========================
    // IndexedDB Helper
    // ==========================
    const openDB = () => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open("TokenDB", 1);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains("tokens")) {
                    db.createObjectStore("tokens", { keyPath: "token" });
                }
            };

            request.onsuccess = (event) => resolve(event.target.result);
            request.onerror = (event) => reject(event.target.error);
        });
    };

    const addOrUpdateToken = async (data) => {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("tokens", "readwrite");
            const store = transaction.objectStore("tokens");
            store.put(data); // put = add atau update
            transaction.oncomplete = () => resolve(true);
            transaction.onerror = (e) => reject(e);
        });
    };

    const getAllTokens = async () => {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("tokens", "readonly");
            const store = transaction.objectStore("tokens");
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    };

    // ==========================
    // Fetch API dan simpan IndexedDB
    // ==========================
    const fetchAndSaveData = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/indexdb"); // ganti dengan endpoint API-mu
            const data = await response.json();

            for (let item of data) {
                await addOrUpdateToken(item);
            }

            const allTokens = await getAllTokens();
            setTokens(allTokens);
        } catch (error) {
            console.error("Gagal fetch atau simpan data:", error);
        }
    };

    useEffect(() => {
        fetchAndSaveData();
    }, []);

    // ==========================
    // Render tabel
    // ==========================
    return (
        <div>
            <span>Proses InsertDB ke indexDB</span>
        </div>
    );
}

export default InsertDB;

// Simpan file PDF ke IndexedDB
async function savePdfToIndexedDB(filename) {
    // Fetch file PDF dari public/file
    const response = await fetch(`/pdf/${filename}`);
    const blob = await response.blob(); // Ambil sebagai Blob

    const openRequest = indexedDB.open("pdfDatabase", 1);

    openRequest.onupgradeneeded = function (event) {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("pdfs")) {
            db.createObjectStore("pdfs");
        }
    };

    openRequest.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction("pdfs", "readwrite");
        const store = transaction.objectStore("pdfs");

        // Simpan blob PDF ke IndexedDB
        const putRequest = store.put(blob, filename);

        putRequest.onsuccess = function () {
            console.log("PDF berhasil disimpan ke IndexedDB!");
        };

        putRequest.onerror = function () {
            console.error("Gagal menyimpan PDF ke IndexedDB");
        };
    };
}
savePdfToIndexedDB("Bahasa Indonesia_kelas6.pdf");
