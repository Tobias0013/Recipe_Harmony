import React from "react";
import { Link } from "react-router-dom";

/**
 * ListItem component represents a single item in the navigation bar.
 * @param prop - The props for the ListItem component.
 * @param prop.text - The text to display for the ListItem.
 * @param prop.location - The current location of the user.
 * @param prop.setNavbarShow - Function to set navbar state.
 * @returns {JSX.Element} The ListItem component.
 */
export default function ListItem(prop: {
    text: string;
    path: string;
    location: string;
    setNavbarShow: Function;
}) {
    const { text, path, location, setNavbarShow } = prop;

    const handleClick = () => {
        text === "Logout" && sessionStorage.removeItem("jwt");
        setNavbarShow(false);
    };

    return (
        <li>
            <Link
                to={path}
                onClick={handleClick}
                style={{
                    color: location == text ? "#509e2f" : "#3a3a3a",
                }}
            >
                {text}
            </Link>
        </li>
    );
}
