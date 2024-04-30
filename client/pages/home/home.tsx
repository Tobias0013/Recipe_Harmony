import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../component/header/header";

export default function Home() {
    const handleClick = () => {
        console.log(useLocation());
    };

    return (
        <>
            <Header loggedIn={false} />
            <h1 onClick={handleClick}>Home</h1>{" "}
        </>
    );
}
