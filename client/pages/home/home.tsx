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
            return;
        }
        setRecipes(recipes);

        const { error: e, recipes: recipe } = await recipeAPI.get({
            limit: 1,
            skip: new Date().getDate(),
        });

        if (e) {
            alert("Error: 500 server error");
            return;
        }
        setRecipeToday(recipe[0]);
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    return (
        recipes &&
        recipeToday && (
            <main>
                <section className="home-banner">
                    <Banner
                        id={recipeToday._id}
                        image={
                            recipeToday.image.url
                                ? recipeToday.image.url
                                : recipeToday.image.base64
                        }
                        name={recipeToday.name}
                    />
                </section>
                <section>
                    <div className="home-content-title">
                        <h1>Recommended Recipes</h1>
                    </div>
                    <div className="home-content-recipe-card">
                        {recipes.map((recipe) => (
                            <RecipeCard
                                key={recipe._id}
                                id={recipe._id}
                                title={recipe.name}
                                cookTime={recipe.cook_time}
                                prepTime={recipe.prep_time}
                                image={
                                    recipe.image.url
                                        ? recipe.image.url
                                        : recipe.image.base64
                                }
                                ratingCount={recipe.review_count}
                            />
                        ))}
                    </div>
                </section>
            </main>
        )
    );
}
