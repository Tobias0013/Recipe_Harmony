import url from "../config"

/**
 * Represents a query object used for fetching recipes.
 */
type Query = {
    tags?: string[];
    cookTimeLess?: number;
    limit: number;
    skip?: number;
}

/**
 * Retrieves recipes based on the provided query parameters.
 * @param query - The query parameters for fetching recipes.
 * @returns An object containing the error (if any) or the retrieved recipes.
 */
async function get(query: Query): Promise<any> {
    const { limit, skip, tags, cookTimeLess } = query;
    
    let fetchURL = url;
    fetchURL += "/api/recipes";
    
    const queryParams: string[] = [];

    queryParams.push(`limit=${limit}`);
    queryParams.push(`skip=${skip}`);
    
    cookTimeLess && queryParams.push(`cookTimeLess=${cookTimeLess}`);
    
    if (tags && tags.length > 0) {
        tags.length > 1 ? queryParams.push(`tag=${tags.join(",")}`) : queryParams.push(`tag=${tags[0]}`)
    }
    fetchURL += `?${queryParams.join("&")}`;    

    try {
        const data = await (await fetch(fetchURL)).json();
        return {error: null, recipes: data};        
    }
    catch (e) {
        return {error: e, recipes: null}
    }
}

/**
 * Retrieves recipes by name from the API.
 * @param name - The name of the recipe to search for.
 * @param limit - The maximum number of recipes to retrieve.
 * @param skip - The number of recipes to skip before retrieving.
 * @returns An object containing the error (if any) or the retrieved recipes.
 */
async function getByName(name:string, limit: number, skip: number){
    let fetchURL = url;
    fetchURL += `/api/recipes?name=${name}&limit=${limit}&skip=${skip}`;

    try {
        const data = await (await fetch(fetchURL)).json();
        return {error: null, recipes: data};        
    }
    catch (e) {
        return {error: e, recipes: null}
    }
}

/**
 * Fetches a recipe by its ID.
 * @param id - The ID of the recipe to fetch.
 * @returns An object containing the error (if any) or the retrieved recipe.
 */
async function getById(id: string){
    let fetchURL = url;
    fetchURL += `/api/recipes/${id}`;

    try {
        const res = await fetch(fetchURL);
        const data = await res.json();

        if (res.status !== 200)
            return {error: res.status, recipe: await data};

        return {error: null, recipe: data};        
    }
    catch (e) {
        return {error: e, recipe: null}
    }
}

async function deleteById(id: string, jwtToken: string){
    let fetchURL = url;
    fetchURL += `/api/recipes/${id}`;

    try {
        const res = await fetch(fetchURL, {
            method: "DELETE",
            headers: {
                Authorization: jwtToken
            }
        });

        if (res.status !== 200)
            return {error: res.status, res: await res.json()};
        
        return {error: null, res: await res.json()};        
    }
    catch (e) {
        return {error: e, res: null}
    }
}

async function post(data: any, token: any) {
    try {
        const response = await fetch(`${url}/api/recipes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            return { error: null, recipe: await response.json() };
        } 
        else {
            console.error("Failed to add recipe:", response.statusText);
            return { error: await response.json(), recipe: null };
        }
    } 
    catch (error) {
        console.error("Error adding recipe:", error.message);
        return { error: error.message, recipe: null };
    }
}

async function patch(id: any, data: any, token: any) {
     try {
        const response = await fetch(`${url}/api/recipes/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            return { error: null, recipe: await response.json() };
        } 
        else {
            console.error("Failed to add recipe:", response.statusText);
            return { error: await response.json(), recipe: null };
        }
    } 
    catch (error) {
        console.error("Error adding recipe:", error.message);
        return { error: error.message, recipe: null };
    }
}

export default {
    get,
    getByName,
    getById,
    deleteById,
    post,
    patch
}
