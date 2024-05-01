import React from "react";

export default function Banner(prop: {
    image: string;
    title: string;
    firstName: string;
    lastName: string;
}) {
    const { image, title, firstName, lastName } = prop;
    return (
        <div className={`home-banner-container`}>
            <img
                className="home-banner-image"
                src={image}
                alt="Picture of food from a recipe"
            />
            <div className="home-banner-overlay">
                <p className="home-banner-trending">Today's recipe</p>
                <p className="home-banner-title">{title}</p>
                <p className="home-banner-author">{`By ${firstName} ${lastName}`}</p>
            </div>
        </div>
    );
}
