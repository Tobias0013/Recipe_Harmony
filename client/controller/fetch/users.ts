import url from "../config"

async function signup(fullName: string, password: string, email: string): Promise<Response> {
    try {
        const response = await fetch(`${url}/api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                full_name: fullName,
                password: password,
                email: email
            })
        });

        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function login(email: string, password: string): Promise<Response> {
    try{
        const response = await fetch(`${url}/api/session`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        return response;
    }catch(err){
        console.log(err);
        throw err;
    }
}

async function fetchAll(jwtToken: string){
    try{
        const response = await fetch(`${url}/api/users`, {
            method: "GET",
            headers: {
                "Authorization": jwtToken
            }
        });

        return response;
    }catch(err){
        console.log(err);
        throw err;
    }
}

/**
 * Retrieves the favorite recipes for a user.
 * @param id - The ID of the user.
 * @param token - The authorization token.
 * @returns An object containing the error (if any) and the favorite recipes.
 */
async function getRecipes(id: string, token: string) {
    try{
        const response = await fetch(`${url}/api/users/${id}/favorites`, {
            headers: {
                "Authorization": token
            }
        });

        if (response.status !== 200) {
            return { error: await response.json(), favorite_recipes: null };
        }

        return { error: null, favorite_recipes: await response.json() };
    }
    catch(e){
        console.log(e);
        return { error: e, favorite_recipes: null };
    }
}

/**
 * Updates the favorite recipes of a user.
 * @param favorite_recipes - An array of strings representing the favorite recipes.
 * @returns A promise that resolves to an object containing the error and the updated favorite recipes.
 */
async function updateFavorites(favorite_recipes: string[]) {
    console.log("DEBUG-a", favorite_recipes);
    
    const token = sessionStorage.getItem("jwt");
    if (!token) {
        return { error: -1 , shoppingList: null };
    }
    const userId = JSON.parse(atob(token.split(".")[1])).user_id;

    const response = await fetch(`${url}/api/users/${userId}/favorites`, {
        method: "PATCH",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ favorite_recipes })
    });

    if (response.status !== 200) {
        return { error: await response.json(), favorite_recipes: null };
    }
    return { error: null, favorite_recipes: await response.json() };
}

export default {
    user: {
        signup: signup,
        login: login,
        getAll: fetchAll
    },
    getRecipes,
    updateFavorites
}
