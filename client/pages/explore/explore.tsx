import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import "./explore.css";
import ExploreExample from "./exploreExample";
import InfiniteScrollSection from "../../component/infiniteScroll/InfiniteScrollSection";
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
        setSkip((prevSkip) => prevSkip + 12);
    };

    const fetchRecipes = async (skip: number) => {
        const name = queryParameters.get("name");
        if (name) {
            const { error, recipes } = await recipeAPI.getByName(
                name,
                12,
                skip
            );
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
            limit: 12,
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
        fetchRecipes(0);
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

                <InfiniteScrollSection
                    recipes={recipes}
                    skip={skip}
                    hasMore={hasMore}
                    fetchRecipes={fetchRecipes}
                />
            </main>
        )
    );
}

const getExploreExamples = (): { text: string; url: string }[] => {
    return [
        //TODO redo based on recipes in DB
        {
            text: "Cook time under 10 min",
            url: `/explore?cookTimeLess=10`,
        },
        {
            text: "Cook time under 20 min",
            url: "/explore?cookTimeLess=20",
        },
        {
            text: "Cook time under 30 min",
            url: "/explore?cookTimeLess=30",
        },
        {
            text: "Pasta",
            url: "/explore?tag=Pasta",
        },
        {
            text: "Chicken",
            url: "/explore?tag=Chicken",
        },
    ];
};
