import React, { useEffect, useState } from "react";
import "./explore.css";
import { useSearchParams } from "react-router-dom";

import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import RecipeCard from "../../component/recipe_card/recipeCard";
import ExploreExample from "./exploreExample";

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
            url: "http://localhost:8080/explore?ingreedient=pasta",
        },
        {
            text: "Chicken",
            url: "http://localhost:8080/explore?ingreedient=rice",
        },
    ];

    const fetchRecipes = async () => {
        //get querry parms
        queryParameters.get("")

        // what to do if name is there? chose seperate fetch?

        setRecipes(/*  */);
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

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
                                key={recipe.id}
                                title={recipe.name}
                                cookTime={recipe.cookTimeMinutes}
                                image={recipe.image}
                                rating={recipe.rating}
                            />
                        ))}
                    </div>
                </section>
            </main>
        )
    );
}
