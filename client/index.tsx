import React from "react";
import ReactDOM from "react-dom/client";

import Header from "./component/header/header";

const rootElem = document.getElementById("root");

if (!rootElem) {
    process.exit(1);
}

const root = ReactDOM.createRoot(rootElem);

root.render(
    <>
        <Header />
    </>
);
