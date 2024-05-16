import url from "../config"

async function getShoppingList() {
    const token = sessionStorage.getItem("jwt");
    if (!token) {
        return { error: -1 , shoppingList: null };
    }
    const householdId = JSON.parse(atob(token.split(".")[1])).household_id;

    console.log("DEBUG", householdId);
    

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

export default {
    getShoppingList,
    appendShoppingList,
    replaceShoppingList
}