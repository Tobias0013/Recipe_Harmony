import React from "react";
import ReactDOM from "react-dom/client";

import Table from "./component/table";

const rootElem = document.getElementById("root");

if (!rootElem) {
    process.exit(1);
}

const root = ReactDOM.createRoot(rootElem);

root.render(
    <>
        <Table />
    </>
);
