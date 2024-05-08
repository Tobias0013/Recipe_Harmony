import React, { useEffect, useState } from "react";
import "./recipe.css";

export default function Recipe() {
    const [recipe, setRecipe] = useState(tempRecipe);

    const starStates: string[] = ((rating = recipe.rating): string[] => {
        const states: string[] = [];

        for (let i = 0; i < 5; i++) {
            if (rating >= 0.9) states.push("star");
            else if (rating >= 0.5) states.push("star_half");
            else states.push("star_outline");
            rating -= 1;
        }
        return states;
    })();

    return (
        <main>
            <section className="recipe-first-section">
                <div className="recipe-info">
                    <p className="recipe-name">{recipe.name}</p>
                    <div className="recipe-rating">
                        <div>
                            {starStates.map((state) => (
                                <span className="material-icons">{state}</span>
                            ))}
                        </div>
                        <p>{`${recipe.rating} of 5 (${recipe.review_count} votes)`}</p>
                    </div>
                    <div>
                        <span className="material-icons">schedule</span>
                        <p>45 min</p>
                    </div>
                    <div>
                        <span className="material-icons">signal_cellular_alt</span>
                        <p>Medium</p>
                    </div>
                    <div>
                        <p>Tags: Beef, Stir-fry, Asian</p>
                    </div>
                </div>
                <div>
                    <img
                        className="recipe-image"
                        src={recipe.image.url}
                        alt="Cover image for recipe"
                    />
                </div>
            </section>
            <section>{/* instruction and ingredients */}</section>
        </main>
    );
}

const tempRecipe = {
    image: {
        type: "link",
        url: "https://cdn.dummyjson.com/recipe-images/8.webp",
    },
    _id: "663009ab7535fd8b47d0929b",
    name: "Beef and Broccoli Stir-Fry",
    prep_time: 20,
    cook_time: 15,
    author: "662fcd37aa94785cbe8a847d",
    servings: 4,
    tags: ["Beef", "Stir-fry", "Asian"],
    calories: 380,
    ingredients: [
        {
            _id: "663b98fd0dd4b6cf2cc9db1c",
            name: "Beef sirloin, thinly sliced",
            quantity_type: "",
            quantity: 0,
        },
        {
            _id: "663b98fd0dd4b6cf2cc9db1d",
            name: "Broccoli florets",
            quantity_type: "",
            quantity: 0,
        },
        {
            _id: "663b98fd0dd4b6cf2cc9db1e",
            name: "Soy sauce",
            quantity_type: "",
            quantity: 0,
        },
        {
            _id: "663b98fd0dd4b6cf2cc9db1f",
            name: "Oyster sauce",
            quantity_type: "",
            quantity: 0,
        },
        {
            _id: "663b98fd0dd4b6cf2cc9db20",
            name: "Sesame oil",
            quantity_type: "",
            quantity: 0,
        },
        {
            _id: "663b98fd0dd4b6cf2cc9db21",
            name: "Garlic, minced",
            quantity_type: "",
            quantity: 0,
        },
        {
            _id: "663b98fd0dd4b6cf2cc9db22",
            name: "Ginger, minced",
            quantity_type: "",
            quantity: 0,
        },
        {
            _id: "663b98fd0dd4b6cf2cc9db23",
            name: "Cornstarch",
            quantity_type: "",
            quantity: 0,
        },
        {
            _id: "663b98fd0dd4b6cf2cc9db24",
            name: "Cooked white rice for serving",
            quantity_type: "",
            quantity: 0,
        },
    ],
    difficulty: "Medium",
    instructions: [
        {
            _id: "663b98fd0dd4b6cf2cc9db25",
            step: 1,
            text: "In a bowl, mix soy sauce, oyster sauce, sesame oil, and cornstarch to create the sauce.",
        },
        {
            _id: "663b98fd0dd4b6cf2cc9db26",
            step: 2,
            text: "In a wok, stir-fry thinly sliced beef until browned. Remove from the wok.",
        },
        {
            _id: "663b98fd0dd4b6cf2cc9db27",
            step: 3,
            text: "Stir-fry broccoli florets, minced garlic, and minced ginger in the same wok.",
        },
        {
            _id: "663b98fd0dd4b6cf2cc9db28",
            step: 4,
            text: "Add the cooked beef back to the wok and pour the sauce over the mixture.",
        },
        {
            _id: "663b98fd0dd4b6cf2cc9db29",
            step: 5,
            text: "Stir until everything is coated and heated through.",
        },
        {
            _id: "663b98fd0dd4b6cf2cc9db2a",
            step: 6,
            text: "Serve over cooked white rice.",
        },
    ],
    rating: 4.7,
    review_count: 18,
};
