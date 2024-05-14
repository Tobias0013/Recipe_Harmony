import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import "./recipe.css";
import recipeAPI from "../../controller/fetch/recipes";

/**
 * The Recipe component.
 * @returns The Recipe component.
 */
export default function Recipe() {
    const navigate = useNavigate();
    const [queryParameters] = useSearchParams();

    const [recipe, setRecipe] = useState<any>();
    const [favorite, setFavorite] = useState(false); //TODO change if user favorite
    const [isAuthor, setIsAuthor] = useState(false);

    const fetchRecipe = async (recipeId) => {
        let { error: e, recipe } = await recipeAPI.getById(recipeId);
        if (e) {
            alert(
                `Error: ${e.status ? "400 client error" : "500 server error"}`
            );
            return;
        }

        setRecipe(recipe);
        // Check if user is author
        const token = sessionStorage.getItem("jwt");
        if (!token) {
            return;
        }
        const userId = JSON.parse(atob(token.split(".")[1])).user_id;
        userId === recipe.author && setIsAuthor(true);

        //TODO set favorite
    };

    useEffect(() => {
        const recipeId = queryParameters.get("recipe");
        !recipeId && navigate("/explore");

        fetchRecipe(recipeId);
    }, []);

    const handlePressFavorite = () => {
        //TODO change if user favorite
        setFavorite((prev) => !prev);
    };

    const handleBtnEdit = () => {
        navigate("/add");
        //TODO edit
    };

    const handleBtnDel = () => {
        const input = window.prompt('Enter "delete"');
        if (input !== "delete") {
            console.log(":(");
            return;
        }
        //TODO delete
    };

    return (
        recipe && (
            <main>
                <section className="recipe-section first">
                    <div>
                        <p className="recipe-name">{recipe.name}</p>
                        <p className="recipe-author">
                            Recipe by {recipe.author.full_name}
                        </p>

                        <p className="recipe-info-header">Rating</p>
                        <div className="recipe-rating">
                            <div>
                                <span className={`material-icons`}>
                                    favorite
                                </span>
                            </div>
                            <p>{`${recipe.review_count} Favorites`}</p>
                        </div>
                        <div className="recipe-info">
                            <span className="material-icons">schedule</span>
                            <p>{`${recipe.prep_time} min prep time`}</p>
                        </div>
                        <div className="recipe-info">
                            <span className="material-icons">schedule</span>
                            <p>{`${recipe.cook_time} min cook time`}</p>
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
                                <p>{`${recipe.calories} kcal`}</p>
                            </div>
                        )}

                        {isAuthor && (
                            <div className="recipe-info">
                                <button
                                    onClick={handleBtnEdit}
                                    className="recipe-btn"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={handleBtnDel}
                                    className="recipe-btn"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                        <div className="recipe-tags">
                            <p>Tags: {recipe.tags.join(", ")}</p>
                            <span
                                onClick={handlePressFavorite}
                                className="material-icons recipe-favorite"
                            >
                                {`${favorite ? "favorite" : "favorite_border"}`}
                            </span>
                        </div>
                    </div>
                    <div>
                        <img
                            className="recipe-image"
                            src={
                                recipe.image.url
                                    ? recipe.image.url
                                    : recipe.image.base64
                            }
                            alt="Cover image for recipe"
                        />
                    </div>
                </section>
                <section className="recipe-section second">
                    <div>
                        <div className="recipe-header">
                            Ingredients
                            <p className="recipe-serving">{`(${recipe.servings} servings)`}</p>
                        </div>
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
                        <div className="recipe-header">Instructions</div>
                        <ul>
                            {recipe.instructions.map((ins) => (
                                <li
                                    className="recipe-instruction"
                                    key={ins._id}
                                >
                                    <p>{`${ins.step}.`}</p>
                                    <p>{`${ins.text}`}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
        )
    );
}
