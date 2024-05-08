import React, { useState, useEffect } from "react";
import "./recipe.css"; // Import the CSS file

// TODO: Remove this once able to fetch data from your actual API
const exampleData = async () => {
    try {
        const res = await fetch(
            "https://dummyjson.com/recipe?limit=5&select=id,name,image,cookTimeMinutes,rating" // Change limit to 5
        );
        const data = await res.json();
        return data.recipes;
    } catch (e) {
        console.log(e);
        return null;
    }
};

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await exampleData(); // Use exampleData function to fetch data
                if (!data) {
                    throw new Error("Failed to fetch recipes");
                }
                setRecipes(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleRemoveRecipe = (id) => {
        // Implement logic to remove recipe with the specified id
    };

    const handleEditRecipe = (id) => {
        // Implement logic to edit recipe with the specified id
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <main>
            <section>
                <h1>RECIPES</h1>
                <div className="recipes">
                    {recipes.map((recipe) => (
                        <div key={recipe.id} className="recipe">
                            <div className="recipe-actions">
                                <button className="remove-button" onClick={() => handleRemoveRecipe(recipe.id)}>X</button>
                                <button onClick={() => handleEditRecipe(recipe.id)}>Edit</button>
                            </div>
                            <img src={recipe.image} alt={recipe.name} />
                            <div className="recipe-details">
                                <h2>{recipe.name}</h2>
                                <p>Cook Time: {recipe.cookTimeMinutes} minutes</p>
                                <p>Rating: {recipe.rating}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Recipes;
