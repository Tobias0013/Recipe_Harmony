import React, { useState, useEffect } from "react";
import "./recipe.css";

interface Recipe {
    id: string;
    name: string;
    image: string;
    cookTimeMinutes: number;
    rating: number;
}

/**
 * Represents single recipe component for admin page.
 * @param {Object} props - The component props.
 * @param {Object} props.recipe - The recipe object to be rendered.
 * @returns {JSX.Element} The single recipe component.
 */
const Recipe = (props: { recipe: any }) => {
    const { recipe } = props;

    const handleRemoveRecipe = (id: string) => {
        // Implement logic to remove recipe with the specified id
    };

    const handleEditRecipe = (id: string) => {
        // Implement logic to edit recipe with the specified id
    };

    return (
        <div className="recipes">
            <div className="recipe">
                <div className="recipe-actions">
                    <button
                        className="remove-button"
                        onClick={() => handleRemoveRecipe(recipe.id)}
                    >
                        X
                    </button>
                    <button onClick={() => handleEditRecipe(recipe.id)}>
                        Edit
                    </button>
                </div>
                <img
                    src={
                        recipe.image.url
                            ? recipe.image.url
                            : recipe.image.base64
                    }
                    alt={recipe.name}
                />
                <div className="recipe-details">
                    <h2>{recipe.name}</h2>
                    <p>Cook Time: {recipe.cookTimeMinutes} minutes</p>
                    <p>Favorite count: {recipe.review_count}</p>
                </div>
            </div>
        </div>
    );
};

export default Recipe;
