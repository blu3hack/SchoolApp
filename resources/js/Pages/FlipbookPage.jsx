import React, { useState } from "react";
import LazyPdfFlipbook from "@/Components/LazyPdfFlipbook";

const App = () => {
    // Ganti URL ini dengan URL file PDF Anda
    const [pdfUrl] = useState();

    return (
        <div className="bg-gray-100 min-h-screen w-screen flex flex-col items-center font-sans antialiased">
            <div className="w-full">
                <LazyPdfFlipbook pdfUrl={pdfUrl} />
            </div>
        </div>
    );
};

export default App;
