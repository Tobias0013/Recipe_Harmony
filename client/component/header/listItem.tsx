import React from "react";

/**
 * ListItem component represents a single item in the navigation bar.
 * @param prop - The props for the ListItem component.
 * @param prop.text - The text to display for the ListItem.
 * @param prop.location - The current location of the user.
 * @returns {JSX.Element} The ListItem component.
 */
export default function ListItem(prop: { text: string; location: string }) {
    const { text, location } = prop;
    return (
        <li>
            <a
                href="#" //TODO Link to different pages
                style={{
                    color: location == text ? "#509e2f" : "#3a3a3a",
                }}
            >
                {text}
            </a>
        </li>
    );
}
