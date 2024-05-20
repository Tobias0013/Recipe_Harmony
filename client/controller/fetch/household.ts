import Household from "../../component/household/household";
import url from "../config"

/**
 * Retrieves the shopping list for the user's household.
 * @returns {Promise<{ error: any, shoppingList: any }>} A promise that resolves to an object containing the error (if any) and the shopping list.
 */
async function getShoppingList() {
    const token = sessionStorage.getItem("jwt");
    if (!token) {
        return { error: -1 , shoppingList: null };
    }
    const householdId = JSON.parse(atob(token.split(".")[1])).household_id;

    const fetchURL = `${url}/api/households/${householdId}/shopping-list`;
    console.log("DEBUG", fetchURL);

    const res = await fetch(fetchURL, {
        method: "GET",
        headers:{
            "Authorization": token
        }
    });

    console.log("DEBUG", res);

    if (res.status !== 200){
        return { error: await res.json(), shoppingList: null };
    }
    return { error: null, shoppingList: await res.json() };
}

async function getIngredientsList() {
    const token = sessionStorage.getItem("jwt");
    if (!token) {
        return { error: -1 , ingredientsList: null };
    }
    const householdId = JSON.parse(atob(token.split(".")[1])).household_id;

    const fetchURL = `${url}/api/households/${householdId}/ingredients`;
    console.log("DEBUG", fetchURL);

    const res = await fetch(fetchURL, {
        method: "GET",
        headers:{
            "Authorization": token
        }
    });

    console.log("DEBUG", res);

    if (res.status !== 200){
        return { error: await res.json(), ingredientsList: null };
    }
    return { error: null, ingredientsList: await res.json() };
}

/**
 * Appends the given ingredients to the shopping list of the user's household.
 * @param ingredients - An array of ingredients to be added to the shopping list.
 * @returns An object containing the error status and the updated shopping list.
 */
async function appendShoppingList(ingredients: any[]) {
    const token = sessionStorage.getItem("jwt");
    if (!token) {
        return { error: -1 };
    }
    const householdId = JSON.parse(atob(token.split(".")[1])).household_id;
    
    const { error, shoppingList } = await getShoppingList()

    if (error || !shoppingList){
        return { error: error, shoppingList: null };
    }
    ingredients.forEach(ingredient => shoppingList.push(ingredient))
    
    const fetchURL = `${url}/api/households/${householdId}/shopping-list`;

    const res = await fetch(fetchURL, {
        method: "PATCH",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            shopping_list: shoppingList
        })
    });

    if (res.status !== 200) {
        return { error: await res.json(), shoppingList: null};
    }
    return { error: null, shoppingList: await res.json() };
}


async function replaceShoppingList(shoppingList: any[]) {
    const token = sessionStorage.getItem("jwt");
    if (!token) {
        return { error: -1 };
    }
    const householdId = JSON.parse(atob(token.split(".")[1])).household_id;
    
    const fetchURL = `${url}/api/households/${householdId}/shopping-list`;

    const res = await fetch(fetchURL, {
        method: "PATCH",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            shopping_list: shoppingList
        })
    });

    if (res.status !== 200) {
        return { error: await res.json(), shoppingList: null};
    }
    return { error: null, shoppingList: await res.json() };
}

async function appendIngredientsList(ingredients: any[]){
    const token = sessionStorage.getItem("jwt");
    if (!token) {
        return { error: -1 };
    }
    const householdId = JSON.parse(atob(token.split(".")[1])).household_id;
    
    const { error, ingredientsList } = await getIngredientsList()

    if (error || !ingredientsList){
        return { error: error, ingredientsList: null };
    }
    ingredients.forEach(ingredient => ingredientsList.push(ingredient))
    
    const fetchURL = `${url}/api/households/${householdId}/ingredients`;

    const res = await fetch(fetchURL, {
        method: "PATCH",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ingredients: ingredientsList
        })
    });

    if (res.status !== 200) {
        return { error: await res.json(), ingredientsList: null};
    }
    return { error: null, ingredientsList: await res.json() };
}

async function replaceIngredientsList(ingredientsList: any[]){
    const token = sessionStorage.getItem("jwt");
    if (!token) {
        return { error: -1 };
    }
    const householdId = JSON.parse(atob(token.split(".")[1])).household_id;
    
    const fetchURL = `${url}/api/households/${householdId}/ingredients`;

    const res = await fetch(fetchURL, {
        method: "PATCH",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ingredients: ingredientsList
        })
    });

    if (res.status !== 200) {
        return { error: await res.json(), ingredientsList: null};
    }
    return { error: null, ingredientsList: await res.json() };
}

/**
 * Retrieves all households from the server.
 * @returns {Promise<{ error: any, households: any[] }>} A promise that resolves to an object containing the error (if any) and the array of households.
 */
async function getAll() {
    const token = sessionStorage.getItem("jwt");
    if (!token) {
        return { error: -1, households: null};
    }
    const fetchURL = `${url}/api/households/all`;

    const res = await fetch(fetchURL, {
        headers: {
            "Authorization": token,
        },
    });

    if (res.status !== 200) {
        return { error: await res.json(), households: null};
    }
    return { error: null, households: await res.json() };
}

async function getById() {
    const token = sessionStorage.getItem("jwt");
    if(!token) {
        return { error: -1, household: null};
    }
    const household_id = JSON.parse(atob(token.split(".")[1])).household_id;
    const fetchURL = `${url}/api/households/${household_id}`

    const res = await fetch(fetchURL, {
        headers: {
            "Authorization": token,
        },
    });

    if(res.status !== 200){
        return {error: await res.json(), household: null};
    }
    return {error: null, household: await res.json()};
}

async function joinById(newHouseholdId: string){
    const token = sessionStorage.getItem("jwt");
    if(!token){
        return { error: -1, household: null};
    }
    const oldHouseholdId = JSON.parse(atob(token.split(".")[1])).household_id;
    const userId = JSON.parse(atob(token.split(".")[1])).user_id;
    const fetchURL = `${url}/api/households/${oldHouseholdId}`;

    const res = await fetch(fetchURL, {
        method: "DELETE",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            newHousegholdId: newHouseholdId,
            userId: userId
        })
    });

    if(res.status !== 200){
        return {error: await res.json(), household: null, newJWT: null};
    }

    //update user JWT after change of household
    const jwtFetchURL = `${url}/api/session/`;
    const jwtRes = await fetch(jwtFetchURL, {
        method: "PATCH",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            jwt: token
        })
    });
    if(jwtRes.status !== 200){
        return {error: await jwtRes.json(), household: null, newJWT: null};
    }
    const newJWT = await jwtRes.json();
    

    return {error: null, household: await res.json(), newJWT: newJWT}
}

export default {
    getShoppingList,
    appendShoppingList,
    replaceShoppingList,
    getIngredientsList,
    appendIngredientsList,
    replaceIngredientsList,
    getAll,
    getById,
    joinById
}