import React, { useEffect, useState } from "react";

function TokenTable() {
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
            <h2>Data Token</h2>
            <table border="1" cellPadding="5" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Token</th>
                        <th>ID Nama</th>
                        <th>Ebook</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {tokens.length > 0 ? (
                        tokens.map((item) => (
                            <tr key={item.token}>
                                <td>{item.token}</td>
                                <td>{item.id_nama}</td>
                                <td>{item.ebook}</td>
                                <td>{item.name}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">Data kosong</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default TokenTable;
