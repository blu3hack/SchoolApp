// resources/js/Utils/showAlert.js
export const showAlert = (message, type = "success") => {
    // Create overlay with fade-in animation
    const overlay = document.createElement("div");
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const alertTypes = {
        success: { color: "#10b981", icon: "✅", title: "Berhasil!" },
        error: { color: "#ef4444", icon: "❌", title: "Error!" },
        warning: { color: "#f59e0b", icon: "⚠️", title: "Peringatan!" },
        info: { color: "#3b82f6", icon: "ℹ️", title: "Informasi" },
    };
    const currentType = alertTypes[type] || alertTypes.success;

    const alertBox = document.createElement("div");
    alertBox.style.cssText = `
        background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
        padding: 30px;
        border-radius: 16px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        border: 1px solid rgba(255, 255, 255, 0.2);
        text-align: center;
        max-width: 420px;
        min-width: 320px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        transform: scale(0.7);
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        position: relative;
        overflow: hidden;
    `;

    const backgroundPattern = document.createElement("div");
    backgroundPattern.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at 20% 80%, ${currentType.color}08 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, ${currentType.color}08 0%, transparent 50%);
        z-index: -1;
    `;
    alertBox.appendChild(backgroundPattern);

    alertBox.innerHTML += `
        <div style="font-size: 48px; margin-bottom: 16px; animation: bounce 0.6s ease-out;">
            ${currentType.icon}
        </div>
        <h3 style="color: ${currentType.color}; margin: 0 0 16px 0; font-size: 24px; font-weight: 600;">
            ${currentType.title}
        </h3>
        <p style="margin: 0 0 24px 0; color: #374151; font-size: 16px;">${message}</p>
        <button onclick="closeAlert(this)" 
            style="background: linear-gradient(135deg, ${currentType.color} 0%, ${currentType.color}dd 100%);
            color: white; border: none; padding: 12px 32px; border-radius: 8px; cursor: pointer; font-size: 16px;">
            OK
        </button>
    `;

    // CSS animation (bisa ditaruh global juga)
    const style = document.createElement("style");
    style.textContent = `
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }
    `;
    document.head.appendChild(style);

    window.closeAlert = function (button) {
        const overlay = button.closest('[style*="position: fixed"]');
        const alertBox = button.closest(
            '[style*="background: linear-gradient"]'
        );
        alertBox.style.transform = "scale(0.8)";
        alertBox.style.opacity = "0";
        overlay.style.opacity = "0";
        setTimeout(() => {
            overlay.remove();
            style.remove();
        }, 300);
    };

    overlay.appendChild(alertBox);
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
        overlay.style.opacity = "1";
        alertBox.style.transform = "scale(1)";
    });

    setTimeout(() => {
        if (document.body.contains(overlay)) {
            window.closeAlert(alertBox.querySelector("button"));
        }
    }, 5000);
};
