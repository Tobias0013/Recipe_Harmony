import React from "react";
import { Link } from "react-router-dom";

/**
 * ListItem component represents a single item in the navigation bar.
 * @param prop - The props for the ListItem component.
 * @param prop.text - The text to display for the ListItem.
 * @param prop.location - The current location of the user.
 * @returns {JSX.Element} The ListItem component.
 */
export default function ListItem(prop: {
    text: string;
    path: string;
    location: string;
}) {
    const { text, path, location } = prop;
    return (
        <li>
            <Link
                to={path}
                style={{
                    color: location == text ? "#509e2f" : "#3a3a3a",
                }}
            >
                {text}
            </Link>
        </li>
    );
}
