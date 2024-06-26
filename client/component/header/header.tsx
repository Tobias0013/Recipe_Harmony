import React, { useState } from "react";
import "./header.css";

import ListItem from "./listItem";
import { Link, useLocation, useNavigate } from "react-router-dom";

/**
 * Represents the header component of the application.
 * @returns {JSX.Element} The header component.
 */
export default function Header() {
    const loggedIn = sessionStorage.getItem("jwt") ? true : false;
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
        const url = query === "" ? "/explore" : `/explore?name=${query}`;
        navigate(url);
        setQuery("");
    };

    let navBarItems = {
        firstRow: [
            { text: "Home", link: "/" },
            { text: "Explore", link: "/explore" },
            { text: "Add Recipe", link: "/add" },
            { text: "About", link: "/about" },
            {
                text: loggedIn ? "Household" : "Login/Register",
                link: loggedIn ? "/household" : "/login",
            },
        ],
        secondRow: [
            { text: "Favorites", link: "/favorites" },
            { text: "Your recipes", link: "/createdRecipes" },
            { text: "Logout", link: "/" },
        ],
    };

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
                        value={query}
                        placeholder="Search here..."
                        onChange={handleQuery}
                    />
                </form>
            </div>

            <div
                style={
                    navbarShow
                        ? loggedIn
                            ? { height: "36rem" }
                            : { height: "23rem" }
                        : {}
                }
                className={`header-nav ${loggedIn && "logged-in"}`}
            >
                <ul className="header-navbar">
                    {navBarItems.firstRow.map((item) => {
                        return (
                            <ListItem
                                key={item.text}
                                text={item.text}
                                path={item.link}
                                location={location}
                                setNavbarShow={setNavbarShow}
                            />
                        );
                    })}
                </ul>
                {loggedIn && (
                    <ul className="header-navbar second">
                        {navBarItems.secondRow.map((item) => {
                            return (
                                <ListItem
                                    key={item.text}
                                    text={item.text}
                                    path={item.link}
                                    location={location}
                                    setNavbarShow={setNavbarShow}
                                />
                            );
                        })}
                    </ul>
                )}
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
    } else if (location.includes("/login") || location.includes("/signup")) {
        location = "Login/Register";
    } else if (location.includes("/household")) {
        location = "Household";
    } else {
        location = "";
    }
    return location;
}
