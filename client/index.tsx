import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./style.css";

import Home from "./pages/home/home";
import Explore from "./pages/explore/explore";

const rootElem = document.getElementById("root");

if (!rootElem) {
    process.exit(1);
}

export default function Index() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/explore" element={<Explore />} />
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(rootElem);

root.render(<Index />);
