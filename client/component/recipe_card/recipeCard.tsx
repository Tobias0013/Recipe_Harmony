import React from "react";
import { Link } from "react-router-dom";
import "./recipeCard.css";

/**
 * Represents a recipe card component.
 * @param prop - The props for the recipe card component.
 * @param prop.title - The title of the recipe.
 * @param prop.cookTime - The cooking time of the recipe in minutes.
 * @param prop.prepTime - The preparation time of the recipe in minutes.
 * @param prop.image - The URL of the recipe image.
 * @param prop.rating - The rating of the recipe.
 * @returns The recipe card component.
 */
export default function RecipeCard(prop: {
    title: string;
    cookTime: number;
    prepTime: number;
    image: string;
    rating: number;
}) {
    const { title, cookTime, prepTime, image, rating } = prop;
    return (
        <div className="recipe-card">
            <div
                className="recipe-card-img"
                style={{
                    background: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            ></div>
            <div className="recipe-card-text-container">
                <div className="recipe-card-row">
                    <div className="recipe-card-title-container">
                        <p className="recipe-card-title">{title}</p>
                    </div>
                    <div className="recipe-card-rating-container">
                        <span className="material-icons recipe-card-star">
                            star
                        </span>
                        <p className="recipe-card-rating">{rating}</p>
                    </div>
                </div>
                <div className="recipe-card-row two">
                    <p className="recipe-card-cook-time">{`${cookTime + prepTime} min`}</p>
                </div>
            </div>
        </div>
    );
}
