import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import RecipeCard from "../../component/recipe_card/recipeCard";

export default function ExploreExample(prop: {
    recipes: any[];
    skip: number;
    hasMore: boolean;
    fetchRecipes: (skip: number) => Promise<void>;
}) {
    const { recipes, skip, hasMore, fetchRecipes } = prop;

    return (
        <InfiniteScroll
            dataLength={recipes.length}
            next={() => fetchRecipes(skip)}
            hasMore={hasMore}
            loader={""}
        >
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
        </InfiniteScroll>
    );
}
