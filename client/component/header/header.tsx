import React, { useEffect, useState, useTransition } from "react";
import "./header.css";

export default function Header() {
    const [navbarShow, setNavbarShow] = useState(false);

    return (
        <header>
            <div className="header-logo">
                <p className="header-recipe">RECIPE</p>
                <p className="header-harmony">HARMONY</p>
            </div>

            <div
                className="header-nav-icon"
                onClick={() => {
                    setNavbarShow(!navbarShow);
                }}
            >
                <span className="material-icons">menu</span>
            </div>

            <div className="header-input-box">
                <i className="material-icons">search</i>
                <input type="text" placeholder="Search here..." />
            </div>

            <ul className={navbarShow ? "header-navbar show" : "header-navbar"}>
                <li>
                    <a href="#">Home</a>
                </li>
                <li>
                    <a href="#">Explore</a>
                </li>
                <li>
                    <a href="#">Add Recipe</a>
                </li>
                <li>
                    <a href="#">About</a>
                </li>
                <li>
                    <a href="#">Login/Register</a>
                </li>
            </ul>
        </header>
    );
}
