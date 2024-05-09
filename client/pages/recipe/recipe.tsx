import React, { useEffect, useState } from "react";
import "./recipe.css";

export default function Recipe() {
    const [recipe, setRecipe] = useState(tempRecipe);

    const starStates: string[] = ((rating = recipe.rating): string[] => {
        const states: string[] = [];

        for (let i = 0; i < 5; i++) {
            if (rating >= 0.5) states.push("recipe-star");
            else states.push("recipe-star e");
            rating -= 1;
        }
        return states;
    })();

    return (
        <main>
            <section className="recipe-section first">
                <div>
                    <p className="recipe-name">{recipe.name}</p>
                    <p className="recipe-author">Recipe by John Doe</p>

                    <p className="recipe-info-header">Rating</p>
                    <div className="recipe-rating">
                        <div>
                            <div>
                                {starStates.map((state, i) => (
                                    <span
                                        key={state + i}
                                        className={`material-icons ${state}`}
                                    >
                                        star
                                    </span>
                                ))}
                            </div>
                        </div>
                        <p>{`${recipe.rating} of 5 (${recipe.review_count} votes)`}</p>
                    </div>
                    <div className="recipe-info">
                        <span className="material-icons">schedule</span>
                        <p>{`${recipe.cook_time + recipe.prep_time} min`}</p>
                    </div>
                    <div className="recipe-info">
                        <span className="material-icons">
                            signal_cellular_alt
                        </span>
                        <p>{recipe.difficulty}</p>
                    </div>
                    {recipe.calories && (
                        <div className="recipe-info">
                            <span className="material-icons">
                                local_fire_department
                            </span>
                            <p>{`${
                                recipe.calories
                            } kcal`}</p>
                        </div>
                    )}
                    <div className="recipe-tags">
                        <p>Tags: {recipe.tags.join(", ")}</p>
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
            <section className="recipe-section second">
                <div>
                    <p className="recipe-header">
                        Ingredients{" "}
                        <p className="recipe-serving">{`(${recipe.servings} servings)`}</p>
                    </p>
                    <ul>
                        {recipe.ingredients.map((ing) => (
                            <li className="recipe-ingredient" key={ing._id}>
                                <p>{`${ing.quantity} ${ing.quantity_type}`}</p>
                                <p>{`${ing.name}`}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <p className="recipe-header">Instructions</p>
                    <ul>
                        {recipe.instructions.map((ins) => (
                            <li className="recipe-instruction" key={ins._id}>
                                <p>{`${ins.step}.`}</p>
                                <p>{`${ins.text}`}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
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
    tags: ["Beef", "Stir-fry", "Asian"],
    ingredients: [
        {
            _id: "663b98fd0dd4b6cf2cc9db1c",
            name: "Beef sirloin, thinly sliced",
            quantity_type: "pcs",
            quantity: 4,
        },
        {
            _id: "663b98fd0dd4b6cf2cc9db1d",
            name: "Broccoli florets",
            quantity_type: "grams",
            quantity: 300,
        },
        {
            _id: "663b98fd0dd4b6cf2cc9db1e",
            name: "Soy sauce",
            quantity_type: "tbsp",
            quantity: 2,
        },
        {
            _id: "663b98fd0dd4b6cf2cc9db1f",
            name: "Oyster sauce",
            quantity_type: "tsp",
            quantity: 3,
        },
        {
            _id: "663b98fd0dd4b6cf2cc9db20",
            name: "Sesame oil",
            quantity_type: "tbsp",
            quantity: 1,
        },
        {
            _id: "663b98fd0dd4b6cf2cc9db21",
            name: "Garlic, minced",
            quantity_type: "tbsp",
            quantity: 2,
        },
        {
            _id: "663b98fd0dd4b6cf2cc9db22",
            name: "Ginger, minced",
            quantity_type: "tsp",
            quantity: 2,
        },
        {
            _id: "663b98fd0dd4b6cf2cc9db23",
            name: "Cornstarch",
            quantity_type: "dl",
            quantity: 1,
        },
        {
            _id: "663b98fd0dd4b6cf2cc9db24",
            name: "Cooked white rice for serving",
            quantity_type: "dl",
            quantity: 5,
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
    rating: 3.7,
    review_count: 18,
    servings: 4,
    calories: 380,
};
