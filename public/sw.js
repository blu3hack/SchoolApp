const CACHE_NAME = "flipbook-cache-v1";
const urlsToCache = [
    "/dashboard",
    "/ClassEbook",
    "/flipbook",
    "/offline.html", // fallback offline
];

// Install event: cache file-file penting
self.addEventListener("install", (event) => {
    console.log("Service Worker: Installing...");
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => {
                console.log("Service Worker: Caching files");
                return cache.addAll(urlsToCache);
            })
            .catch((err) => console.error("Cache failed:", err))
    );
    self.skipWaiting(); // langsung aktif tanpa menunggu
});

// Activate event: bersihkan cache lama jika ada
self.addEventListener("activate", (event) => {
    console.log("Service Worker: Activating...");
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log(
                            "Service Worker: Deleting old cache:",
                            cache
                        );
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event: cache-first, network fallback
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(event.request)
                .then((response) => {
                    // Jangan cache jika bukan GET atau redirect
                    if (
                        event.request.method !== "GET" ||
                        response.redirected ||
                        response.type === "opaqueredirect"
                    ) {
                        return response;
                    }

                    // Simpan response ke cache
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });

                    return response;
                })
                .catch(() => {
                    // fallback offline
                    return caches.match("/offline.html");
                });
        })
    );
});
