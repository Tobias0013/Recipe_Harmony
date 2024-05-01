import React from "react";

/**
 * Renders a banner component with an image, title, and author information.
 *
 * @param prop - The props object containing the image, title, first name, and last name.
 * @param prop.image - The URL of the image to be displayed.
 * @param prop.title - The title of the recipe.
 * @param prop.firstName - The first name of the recipe author.
 * @param prop.lastName - The last name of the recipe author.
 * @returns The rendered banner component.
 */
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