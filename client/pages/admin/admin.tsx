import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import User from "../../component/admin/user";
import Recipe from "../../component/admin/recipe";
import Household from "../../component/admin/household";
import userAPI from "../../controller/fetch/users";
import recipeAPI from "../../controller/fetch/recipes";
import householdAPI from "../../controller/fetch/household";

/**
 * Renders the Admin page component.
 * @returns The rendered Admin page component.
 */
const AdminPage: React.FC = () => {
    const jwtExists = sessionStorage.getItem("jwt");
    const navigate = useNavigate();

    const [users, setUsers] = useState<any>();
    const [errorUser, setErrorUser] = useState<any>();
    const [recipes, setRecipes] = useState<any>();
    const [errorRecipes, setErrorRecipes] = useState<any>();
    const [households, setHouseholds] = useState<any>();
    const [errorHouseholds, setErrorHouseholds] = useState<any>();
    /*
        TODO:
        Move this function to each admin component instead of this page
    */
    useEffect(() => {
        if (!jwtExists) {
            navigate("/");
            return;
        }

        const fetchUsers = (async () => {
            try {
                const response: Response = await userAPI.user.getAll(jwtExists);
                const data = await response.json();

                if (data.error) {
                    return setErrorUser((prev) => prev + `${data.error}\n`);
                }
                setUsers(data);
            } catch (e) {
                console.log(e);
                setErrorUser((prev) => prev + "Internal error\n");
            }
        })();

        const fetchRecipes = (async () => {
            try {
                const { error, recipes } = await recipeAPI.get({
                    limit: 9999,
                });

                if (error) {
                    return setErrorRecipes((prev) => prev + `${error}\n`);
                }
                setRecipes(recipes);
            } catch (e) {
                console.log(e);
                setErrorRecipes((prev) => prev + "Internal error\n");
            }
        })();

        const fetchHouseholds = (async () => {
            try {
                const { error, households } = await householdAPI.getAll();

                if (error) {
                    return setErrorHouseholds((prev) => prev + `${error}\n`);
                }
                setHouseholds(households);
            } catch (e) {
                console.log(e);
                setErrorHouseholds((prev) => prev + "Internal error\n");
            }
        })();
    }, []);

    return (
        users && (
            <div>
                <h1 style={{ fontSize: "3rem" }}>ADMIN PAGE</h1>
                {users && recipes && households && (
                    <h1 style={{ fontSize: "2.5rem" }}>
                        STATISTICS: user count: {users.length}, recipe count{" "}
                        {recipes.length}, household count {households.length}
                    </h1>
                )}
                <section>
                    <h1 style={{ fontSize: "2rem" }}>USER DETAILS</h1>

                    {errorUser ? (
                        <div>Error: {errorUser}</div>
                    ) : (
                        users.map((user) => {
                            return <User key={user._id} user={user} />;
                        })
                    )}
                </section>
                <section>
                    <h1 style={{ fontSize: "2rem" }}>RECIPES</h1>
                    {errorRecipes || !recipes ? (
                        <div>Error: {errorRecipes}</div>
                    ) : (
                        recipes.map((recipe) => {
                            return <Recipe key={recipe._id} recipe={recipe} token={jwtExists} />;
                        })
                    )}
                </section>
                <section>
                    <h1 style={{ fontSize: "2rem" }}>HOUSEHOLDS</h1>
                    {errorHouseholds || !households ? (
                        <div>Error: {errorHouseholds}</div>
                    ) : (
                        households.map((household) => {
                            return (
                                <Household
                                    key={household._id}
                                    household={household}
                                />
                            );
                        })
                    )}
                </section>
            </div>
        )
    );
};

export default AdminPage;
