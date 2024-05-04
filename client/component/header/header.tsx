import React, { useState } from "react";
import "./header.css";

import ListItem from "./listItem";
import { Link, useLocation, useNavigate } from "react-router-dom";

/**
 * Represents the header component of the application.
 * @param {Object} prop - The props for the component.
 * @param {boolean} prop.loggedIn - Indicates whether the user is logged in.
 * @returns {JSX.Element} The header component.
 */
export default function Header(prop: { loggedIn: boolean }) {
    const { loggedIn } = prop;
    const navigate = useNavigate();
    const location = getLocation(useLocation().pathname.toLocaleLowerCase());

    const [navbarShow, setNavbarShow] = useState(false);
    const handleShowNavbar = () => {
        setNavbarShow(!navbarShow);
    };

    const [query, setQuery] = useState("");

    const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/explore?name=${query}`);
    };

    let navBarItems: { text: string; link: string }[] = [
        { text: "Home", link: "/" },
        { text: "Explore", link: "/explore" },
        { text: "Add Recipe", link: "/add" },
        { text: "About", link: "/about" },
        {
            text: loggedIn ? "Household" : "Login/Register",
            link: loggedIn ? "/household" : "/login",
        },
    ];

    return (
        <header>
            <Link to={"/"}>
                <div className="header-logo">
                    <p className="header-recipe">RECIPE</p>
                    <p className="header-harmony">HARMONY</p>
                </div>
            </Link>

            <div className="header-nav-icon" onClick={handleShowNavbar}>
                <span className="material-icons">menu</span>
            </div>

            <div className="header-input-box">
                <form onSubmit={(e) => handleSearch(e)}>
                    <i className="material-icons">search</i>
                    <input
                        type="text"
                        placeholder="Search here..."
                        onChange={handleQuery}
                    />
                </form>
            </div>

            <div className={navbarShow ? "header-nav open" : "header-nav"}>
                <ul className="header-navbar">
                    {navBarItems.map((item) => {
                        return (
                            <ListItem
                                key={item.text}
                                text={item.text}
                                path={item.link}
                                location={location}
                            />
                        );
                    })}
                </ul>
            </div>
        </header>
    );
}

function getLocation(location) {
    if (location === "/") location = "Home";
    else if (location.includes("/explore")) {
        location = "Explore";
    } else if (location.includes("/add")) {
        location = "Add Recipe";
    } else if (location.includes("/about")) {
        location = "About";
    } else if (location.includes("/login") || location.includes("/register")) {
        location = "Login/Register";
    } else if (location.includes("/household")) {
        location = "Household";
    } else {
        location = "";
    }
    return location;
}
