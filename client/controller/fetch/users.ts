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

export default {
    user: {
        signup: signup,
        login: login,
        getAll: fetchAll
    },
    getRecipes
}
