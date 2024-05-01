import React from "react";
import { Link } from "react-router-dom";
import "./recipeCard.css";

export default function RecipeCard(prop: {
    title: string;
    cookTime: number;
    image: string;
    rating: number;
}) {
    const { title, cookTime, image, rating } = prop;
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
                    <p className="recipe-card-cook-time">{`${cookTime} min`}</p>
                </div>
            </div>
        </div>
    );
}
