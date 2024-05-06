import React, { useEffect, useState } from "react";
import "./home.css";

import Banner from "./banner";
import RecipeCard from "../../component/recipe_card/recipeCard";
import recipeAPI from "../../controller/fetch/recipes";

/**
 * Renders the Home component.
 * @returns The rendered Home component.
 */
export default function Home() {
    const [recipes, setRecipes] = useState<any>();
    const [recipeToday, setRecipeToday] = useState<any>();

    const fetchRecipes = async () => {
        const { error, recipes } = await recipeAPI.get({ limit: 8 });
        if (error) {
            alert("Error: 500 server error");
        }
        setRecipes(recipes);

        const rndNmr = Math.floor(Math.random() * recipes.length);
        setRecipeToday(recipes[rndNmr]);
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    console.log("DEBUG", recipes);

    return (
        recipes && (
            <main>
                <section className="home-banner">
                    <Banner
                        image={recipeToday.image.url}
                        title={recipeToday.name}
                    />
                </section>
                <section>
                    <div className="home-content-title">
                        <h1>Recommended Recipes</h1>
                    </div>
                    <div className="home-content-recipe-card">
                        {recipes.map((recipe) => (
                            <RecipeCard
                                key={recipe.id}
                                title={recipe.name}
                                cookTime={recipe.cook_time}
                                image={recipe.image.url}
                                rating={recipe.rating}
                            />
                        ))}
                    </div>
                </section>
            </main>
        )
    );
}
