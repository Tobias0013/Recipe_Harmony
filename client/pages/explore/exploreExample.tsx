import React from "react";
import { Link } from "react-router-dom";

/**
 * Represents an example component for exploring.
 *
 * @param prop - The props for the ExploreExample component.
 * @param prop.id - The ID of the example.
 * @param prop.text - The text content of the example.
 * @param prop.url - The URL to navigate to when the example is clicked.
 * @returns The ExploreExample component.
 */
export default function ExploreExample(prop: {
    id: number;
    text: string;
    url: string;
}) {
    const { id, text, url } = prop;

    return (
        <Link to={url}>
            <div className={`explore-search s${id}`}>
                <div>
                    <p>{text}</p>
                </div>
            </div>
        </Link>
    );
}
