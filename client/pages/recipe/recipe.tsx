import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import "./recipe.css";
import recipeAPI from "../../controller/fetch/recipes";
import userAPI from "../../controller/fetch/users";
import householdAPI from "../../controller/fetch/household";
import AddRecipeForm from "../../component/add_recipe_form/add_form";

/**
 * The Recipe component.
 * @returns The Recipe component.
 */
export default function Recipe() {
    const navigate = useNavigate();
    const [queryParameters] = useSearchParams();

    const [recipe, setRecipe] = useState<any>();
    const [favorite, setFavorite] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [isEdited, setIsEdited] = useState(false);
    const [edit, setEdit] = useState(false);

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
        userId === recipe.author._id && setIsAuthor(true);

        let favorites = sessionStorage.getItem("favorites");
        if (!favorites) {
            return;
        }
        favorites = JSON.parse(favorites)
        
        if (favorites?.includes(recipe._id)) {
            setFavorite(true);
        }
    };

    useEffect(() => {
        const recipeId = queryParameters.get("recipe");
        !recipeId && navigate("/explore");

        fetchRecipe(recipeId);

        queryParameters.get("new") && setIsNew(true);
        queryParameters.get("edit") && setIsEdited(true);
    }, []);

    const handlePressFavorite = async () => {

        let favorites = sessionStorage.getItem("favorites");
        if (!favorites) {
            return;
        }
        favorites = JSON.parse(favorites)

        if (!Array.isArray(favorites)){
            return
        }
        if (favorite) {
            const index = favorites.indexOf(recipe._id);
            favorites.splice(index, 1);
        }
        else {
            favorites.push(recipe._id)
        }
        console.log("DEBUG", favorites);
        const { error, favorite_recipes: newFavorites } = await userAPI.updateFavorites(favorites);

        if (error) {
            return alert("ERROR\nUnable to update favorites\n" + error.Error);
        }
        sessionStorage.setItem("favorites", JSON.stringify(newFavorites))
        setFavorite((prev) => !prev);
    };

    const handleBtnEdit = () => {
        isAuthor && setEdit(true);
    };

    const handleBtnDel = () => {
        const input = window.prompt(
            `Enter "${recipe.name}" to delete the recipe`
        );
        if (input !== recipe.name) {
            console.log(":(");
            return;
        }
        const token = sessionStorage.getItem("jwt");
        if (!token) {
            alert("Error, user not logged in");
            return;
        }
        (async () => {
            const { error, res } = await recipeAPI.deleteById(
                recipe._id,
                token
            );
            if (error) {
                alert(res ? res.Error : "Internal server error");
                return;
            }
            navigate("/explore");
            alert("Recipe has been deleted");
        })();
    };

    const handleBtnIngredients = () => {
        console.log(recipe.ingredients);

        (async () => {
            const { error, shoppingList } =
                await householdAPI.appendShoppingList(recipe.ingredients);
            console.log(error);

            if (error) {
                alert(error.Error);
                return;
            }
            navigate("/shopping-list")
        })();
    };

    if (edit) {
        return (
            <div>
                <AddRecipeForm edit={true} recipe={recipe} recipeId={recipe._id} />
            </div>
        );
    }

    return (
        recipe && (
            <main>
                {(isNew || isEdited) && (
                    <div className="recipe-new-container">
                        <p className="recipe-new">
                            {isNew ? "New recipe successfully created!" : "Recipe successfully edited!"}
                        </p>
                    </div>
                )}
                <section className="recipe-section first">
                    <div>
                        <p className="recipe-name">{recipe.name}</p>
                        <p className="recipe-author">
                            Recipe by {recipe.author.full_name}
                        </p>

                        <div className="recipe-info recipe-rating">
                            <span className={`material-icons`}>favorite</span>
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
                        {recipe.calories > 0 && (
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
                        {sessionStorage.getItem("jwt") && (
                            <button
                                onClick={handleBtnIngredients}
                                className="recipe-btn"
                            >
                                Add to shopping list
                            </button>
                        )}
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
