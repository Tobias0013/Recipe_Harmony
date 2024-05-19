import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import InfiniteScrollSection from "../../component/infiniteScroll/InfiniteScrollSection.tsx";
import Page404 from "../404/error.tsx";
import usersAPI from "../../controller/fetch/users.ts";

export default function CreatedRecipes() {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("jwt");
    if (!token) {
        return <Page404 />;
    }
    const [recipes, setRecipes] = useState<any[]>([]);

    const fetchRecipes = async () => {
        const { error, recipes } = await usersAPI.getCreatedRecipes();
        if (error) {
            return alert("ERROR\nCount fetch created recipes\n" + error.error);
        }
        setRecipes(recipes);
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    if (!recipes) {
        return (
            <h1 className="favorites-title" style={{ marginBottom: "55rem" }}>
                Loading data...
            </h1>
        );
    }

    if (recipes.length === 0) {
        return (
            <>
                <h1 className="favorites-title">You haven't created any recipes!</h1>
                <p
                    className="favorites-title "
                    style={{ marginBottom: "55rem" }}
                >
                    To find recipes click{" "}
                    <Link
                        style={{
                            textDecoration: "underline",
                            color: "blue",
                        }}
                        to={"/add"}
                    >
                        here
                    </Link>{" "}
                    to created new recipes
                </p>
            </>
        );
    }

    return (
        <>
            <main>
                <h1 className="favorites-title">Created recipes: </h1>
                <InfiniteScrollSection
                    recipes={recipes}
                    skip={0}
                    hasMore={false}
                    fetchRecipes={fetchRecipes}
                />
            </main>
            <div style={{ height: "9.25rem" }}></div>
        </>
    );
}
