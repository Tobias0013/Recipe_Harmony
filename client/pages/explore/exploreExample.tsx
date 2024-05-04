import React from "react";
import { Link } from "react-router-dom";

export default function ExploreExample(prop: { id: number; text: string; url: string }) {
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