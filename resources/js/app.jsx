import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        // ⚡️ Tambahan: cek versi asset
        const currentVersion = props.initialPage.props.assetVersion;
        const savedVersion = localStorage.getItem("assetVersion");

        if (savedVersion && savedVersion !== currentVersion) {
            // Jika versi berubah → paksa reload penuh
            localStorage.setItem("assetVersion", currentVersion);
            window.location.reload(true);
        } else {
            localStorage.setItem("assetVersion", currentVersion);
        }

        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: "#4B5563",
    },
});

if ("serviceWorker" in navigator && window.Laravel?.user) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/sw.js")
            .then((reg) => console.log("Service worker terdaftar:", reg))
            .catch((err) => console.log("Gagal daftar service worker:", err));
    });
}
