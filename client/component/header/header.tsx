import React, { useState } from "react";
import "./header.css";

import ListItem from "./listItem";

/**
 * Represents the header component of the application.
 * @param {Object} prop - The props for the component.
 * @param {boolean} prop.loggedIn - Indicates whether the user is logged in.
 * @param {string} prop.location - The current location of the user.
 * @returns {JSX.Element} The header component.
 */
export default function Header(prop: { loggedIn: boolean; location: string }) {
    const { loggedIn, location } = prop;
    const [navbarShow, setNavbarShow] = useState(false);

    const handleShowNavbar = () => {
        setNavbarShow(!navbarShow);
    };

    let navBarItems: string[] = [
        "Home",
        "Explore",
        "Add Recipe",
        "About",
        loggedIn ? "Household" : "Login/Register",
    ];

    return (
        <header>
            <div className="header-logo">
                <p className="header-recipe">RECIPE</p>
                <p className="header-harmony">HARMONY</p>
            </div>

            <div className="header-nav-icon" onClick={handleShowNavbar}>
                <span className="material-icons">menu</span>
            </div>

            <div className="header-input-box">
                <i className="material-icons">search</i>
                <input type="text" placeholder="Search here..." />
            </div>

            <div className={navbarShow ? "header-nav open" : "header-nav"}>
                <ul className="header-navbar">
                    {navBarItems.map((item) => {
                        return <ListItem text={item} location={location} />;
                    })}
                </ul>
            </div>
        </header>
    );
}
