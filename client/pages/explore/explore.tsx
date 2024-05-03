import React, { useEffect, useState } from "react";
import "./explore.css";
import { useSearchParams } from "react-router-dom";

import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import RecipeCard from "../../component/recipe_card/recipeCard";
import { text } from "express";

export default function Explore() {
    const [recipes, setRecipes] = useState<any>();

    const [queryParameters] = useSearchParams();

    const exploreSearch = [
        //TODO redo based on recipes
        "Less than 10 min",
        "Less than 20 min",
        "Less than 30 min",
        "some tag",
        "some tag",
    ];

    const fetchRecipes = async () => {
        setRecipes(await exampleData());
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    return (
        recipes && (
            <>
                <Header loggedIn={false} />
                <main>
                    <section className="explore-section">
                        {queryParameters.size <= 0 &&
                            exploreSearch.map((search, index) => (
                                <ExploreSearch
                                    key={index}
                                    id={index}
                                    text={search}
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
                <Footer />
            </>
        )
    );
}

function ExploreSearch(prop: { id: number; text: string }) {
    const { id, text } = prop;

    return (
        <div className={`explore-search s${id}`}>
            <div>
                <p>{text}</p>
            </div>
        </div>
    );
}

//TODO will remove once able to fetch data
const exampleData = async () => {
    try {
        const res = await fetch(
            "https://dummyjson.com/recipe?limit=16&select=id,name,image,cookTimeMinutes,rating"
        );
        const data = await res.json();
        return data.recipes;
    } catch (e) {
        console.log(e);
        return null;
    }
};
