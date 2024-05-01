import React from "react";

import Header from "../../component/header/header";
import "./home.css";
import Banner from "./banner";
import RecipeCard from "../../component/recipe_card/recipeCard";

export default function Home(prop: { info: string }) {
    const recipes = exampleData;

    return (
        <>
            <Header loggedIn={false} />

            <main>
                <section className="home-banner">
                    <Banner
                        image={"https://cdn.dummyjson.com/recipe-images/1.webp"}
                        title={"Classic Margherita Pizza"}
                        firstName={"Humberto"}
                        lastName={"Botsford"}
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
                                cookTime={recipe.cookTimeMinutes}
                                image={recipe.image}
                                rating={recipe.rating}
                            />
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}

const exampleData = [
    {
        id: 1,
        name: "Classic Margherita Pizza",
        image: "https://cdn.dummyjson.com/recipe-images/1.webp",
        cookTimeMinutes: 15,
        rating: 4.6,
    },
    {
        id: 2,
        name: "Vegetarian Stir-Fry",
        image: "https://cdn.dummyjson.com/recipe-images/2.webp",
        cookTimeMinutes: 20,
        rating: 4.7,
    },
    {
        id: 3,
        name: "Chocolate Chip Cookies",
        image: "https://cdn.dummyjson.com/recipe-images/3.webp",
        cookTimeMinutes: 10,
        rating: 4.9,
    },
    {
        id: 4,
        name: "Chicken Alfredo Pasta",
        image: "https://cdn.dummyjson.com/recipe-images/4.webp",
        cookTimeMinutes: 20,
        rating: 4.9,
    },
    {
        id: 5,
        name: "Mango Salsa Chicken",
        image: "https://cdn.dummyjson.com/recipe-images/5.webp",
        cookTimeMinutes: 25,
        rating: 4.9,
    },
    {
        id: 6,
        name: "Quinoa Salad with Avocado",
        image: "https://cdn.dummyjson.com/recipe-images/6.webp",
        cookTimeMinutes: 15,
        rating: 4.4,
    },
    {
        id: 7,
        name: "Tomato Basil Bruschetta",
        image: "https://cdn.dummyjson.com/recipe-images/7.webp",
        cookTimeMinutes: 10,
        rating: 4.7,
    },
    {
        id: 8,
        name: "Beef and Broccoli Stir-Fry",
        image: "https://cdn.dummyjson.com/recipe-images/8.webp",
        cookTimeMinutes: 15,
        rating: 4.7,
    },
];
