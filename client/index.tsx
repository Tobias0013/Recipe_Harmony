import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./style.css";

import Header from "./component/header/header";
import Home from "./pages/home/home";
import Test from "./pages/test";

const rootElem = document.getElementById("root");

if (!rootElem) {
    process.exit(1);
}


const root = ReactDOM.createRoot(rootElem);
<Header loggedIn={false} location={"Home"} />;
root.render(
    <BrowserRouter>
        <Routes>
            <Route index element={<Home />} />
            <Route path="/test" element={<Test />} />
        </Routes>
    </BrowserRouter>
);
