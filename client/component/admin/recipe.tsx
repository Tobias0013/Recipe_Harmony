import React, { useState, useEffect } from "react";
import "./recipe.css";

import recipeAPI from '../../controller/fetch/recipes';
import AddRecipeForm from "../../component/add_recipe_form/add_form";

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
const Recipe = (props: { recipe: any, token: string }) => {
    const { recipe: recipeData, token } = props;

    const [recipe, setRecipe] = useState(recipeData);
    const [edit, setEdit] = useState(false);

    const handleRemoveRecipe = async () => {
        const conf = confirm(`Do you want to delete recipe "${recipe.name}"`)
        if (!conf)
            return
        const { error, res } = await recipeAPI.deleteById(recipe._id, token);

        if (error) {
            alert(error);
        }
        alert("Recipe successfully removed");
        setRecipe(-1);
    };

    const handleEditRecipe = async () => {
        const { error, recipe: fullRecipe } = await recipeAPI.getById(recipe._id);
        if (error){
            alert(`Cannot fetch full recipe. Status code:${error}`);
            return;
        }
        console.log(fullRecipe);
        
        setRecipe(fullRecipe);
        setEdit(true);
    };

    if (recipe === -1) {
        return;
    }

    if (edit) {        
        return <AddRecipeForm edit={true} recipe={recipe} recipeId={recipe._id} fromAdminPage={true} />
    }

    return (
        <div className="recipes">
            <div className="recipe">
                <div className="recipe-actions">
                    <button
                        className="remove-button"
                        onClick={handleRemoveRecipe}
                    >
                        X
                    </button>
                    <button onClick={handleEditRecipe}>
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
