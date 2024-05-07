import React, { useEffect, useState } from "react";
import "./explore.css";
import { useSearchParams } from "react-router-dom";

import RecipeCard from "../../component/recipe_card/recipeCard";
import ExploreExample from "./exploreExample";
import recipeAPI from "../../controller/fetch/recipes";

/**
 * The Explore component.
 * @returns The Explore component.
 */
export default function Explore() {
    const [recipes, setRecipes] = useState<any>();

    const [queryParameters] = useSearchParams();

    const exploreSearch = [
        //TODO redo based on recipes
        {
            text: "Less than 10 min",
            url: "http://localhost:8080/explore?cookTimeLess=10",
        },
        {
            text: "Less than 20 min",
            url: "http://localhost:8080/explore?cookTimeLess=20",
        },
        {
            text: "Less than 30 min",
            url: "http://localhost:8080/explore?cookTimeLess=30",
        },
        {
            text: "Pasta",
            url: "http://localhost:8080/explore?tag=Pasta",
        },
        {
            text: "Chicken",
            url: "http://localhost:8080/explore?tag=Rice",
        },
    ];

    const fetchRecipes = async () => {
        // if query contains name
        const name = queryParameters.get("name");

        if (name) {
            const { error, recipes } = await recipeAPI.getByName(name);
            if (error) {
                alert("Error: 500 server error");
                return;
            }
            setRecipes(recipes);
            return;
        }

        const limit = queryParameters.get("limit");
        const skip = queryParameters.get("skip");
        const cookTimeLess = queryParameters.get("cookTimeLess");
        const tags = queryParameters.getAll("tag");

        const { error, recipes } = await recipeAPI.get({
            limit: limit ? parseInt(limit) : undefined,
            skip: skip ? parseInt(skip) : undefined,
            cookTimeLess: cookTimeLess ? parseInt(cookTimeLess) : undefined,
            tags: tags ? tags : undefined,
        });

        if (error) {
            alert("Error: 500 server error");
            return;
        }
        setRecipes(recipes);
    };

    useEffect(() => {
        fetchRecipes();
    }, [queryParameters]);

    return (
        recipes && (
            <main>
                <section className="explore-section">
                    {queryParameters.size < 1 &&
                        exploreSearch.map((s, index) => (
                            <ExploreExample
                                key={index}
                                id={index}
                                text={s.text}
                                url={s.url}
                            />
                        ))}
                </section>
                <section>
                    <div className="explore-section">
                        {recipes.map((recipe) => (
                            <RecipeCard
                                key={recipe._id}
                                title={recipe.name}
                                cookTime={recipe.cook_time}
                                prepTime={recipe.prep_time}
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
