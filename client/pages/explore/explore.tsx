import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./explore.css";
import RecipeCard from "../../component/recipe_card/recipeCard";
import ExploreExample from "./exploreExample";
import recipeAPI from "../../controller/fetch/recipes";

/**
 * The Explore component.
 * @returns The Explore component.
 */
export default function Explore() {
    const [queryParameters] = useSearchParams();

    const [recipes, setRecipes] = useState<any[]>([]);
    //used for infinite scrolling
    const [hasMore, setHasMore] = useState(true);
    const [skip, setSkip] = useState(0);

    const exploreExamples = getExploreExamples();

    const updateSkip = () => {
        setSkip((prevSkip) => prevSkip + 8);
    };

    const fetchRecipes = async () => {
        console.log("DEBUG e", skip);

        // Fetch init data
        const name = queryParameters.get("name");
        if (name) {
            const { error, recipes } = await recipeAPI.getByName(name, 8, skip);
            if (error) {
                alert("Error: 500 server error");
                return;
            }
            setRecipes((prevItems) => [...prevItems, ...recipes]);
            updateSkip();
            return;
        }

        const cookTimeLess = queryParameters.get("cookTimeLess");
        const tags = queryParameters.getAll("tag");

        const { error, recipes } = await recipeAPI.get({
            cookTimeLess: cookTimeLess ? parseInt(cookTimeLess) : undefined,
            tags: tags ? tags : undefined,
            limit: 8,
            skip: skip,
        });

        if (error) {
            alert("Error: 500 server error");
            return;
        }
        setRecipes((prevItems) => [...prevItems, ...recipes]);
        updateSkip();
    };

    useEffect(() => {
        setHasMore(true);
        setSkip(0);
        setRecipes([]);
        fetchRecipes();
    }, [queryParameters]);

    return (
        recipes && (
            <main>
                <section className="explore-section">
                    {queryParameters.size < 1 &&
                        exploreExamples.map((s, index) => (
                            <ExploreExample
                                key={index}
                                id={index}
                                text={s.text}
                                url={s.url}
                            />
                        ))}
                </section>
                <InfiniteScroll
                    dataLength={recipes.length}
                    next={fetchRecipes}
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
            </main>
        )
    );
}

const getExploreExamples = (): { text: string; url: string }[] => {
    return [
        //TODO redo based on recipes in DB
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
            url: "http://localhost:8080/explore?tag=Chicken",
        },
    ];
};
