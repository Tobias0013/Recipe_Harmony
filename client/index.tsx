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
import CreatedRecipes from "./pages/createdRecipes/createdRecipes";
import ShoppingListPage from "./pages/shopping_list/shopping_list";
import IngredientsListPage from "./pages/ingredients_list/ingredients_list";
import InternalErrorPage from "./pages/500/error";
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
                <Route path="/createdRecipes" element={<CreatedRecipes />} />
                <Route path="/shopping-list" element={<ShoppingListPage />} />¨
                <Route path="/ingredients" element={<IngredientsListPage />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/500" element={<InternalErrorPage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(rootElem);

root.render(<Index />);
