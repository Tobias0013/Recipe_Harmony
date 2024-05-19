import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./style.css";

import Header from "./component/header/header";
import Home from "./pages/home/home";
import Explore from "./pages/explore/explore";
import LoginDesign from "./pages/login/login";
import SignUpDesign from "./pages/sign_up/sign_up";
import AddRecipeDesign from "./pages/add_recipe/add_recipe";
import AboutPage from "./pages/about/about";
import Footer from "./component/footer/footer";
import AdminPage from "./pages/admin/admin";
import Recipe from "./pages/recipe/recipe";
import HouseHoldPage from "./pages/household/household";
import NotFoundPage from "./pages/404/error";
import Favorites from "./pages/favorites/favorites";

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
                <Route path="/add" element={<AddRecipeDesign />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/recipe" element={<Recipe />} />
                <Route path="/household" element={<HouseHoldPage />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(rootElem);

root.render(<Index />);
