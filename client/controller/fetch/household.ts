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

    console.log("DEBUG", householdId);
    

    const fetchURL = `${url}/api/households/${householdId}/shopping-list`;
    console.log("DEBUG", fetchURL);

    const res = await fetch(fetchURL);

    console.log("DEBUG", res);

    if (res.status !== 200){
        return { error: await res.json(), shoppingList: null };
    }
    return { error: null, shoppingList: await res.json() };
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

export default {
    getShoppingList,
    appendShoppingList,
    getAll
}