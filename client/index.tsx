import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./style.css";

import Header from "./component/header/header";
import Home from "./pages/home/home";
import Explore from "./pages/explore/explore";
import LoginDesign from "./pages/login/login";
import SignUpDesign from "./pages/sign_up/sign_up";
import AboutPage from "./pages/about/about";
import AdminPag from "./pages/admin/admin";
import Footer from "./component/footer/footer";
import AdminPage from "./pages/admin/admin";
const rootElem = document.getElementById("root");

if (!rootElem) {
    process.exit(1);
}

export default function Index() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route index element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/login" element={<LoginDesign />} />
                <Route path="/signup" element={<SignUpDesign />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(rootElem);

root.render(<Index />);
