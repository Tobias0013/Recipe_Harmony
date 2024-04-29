async function fetchRecipeData(){
    try{
        const response = await fetch("https://dummyjson.com/recipes?skip=0&limit=0")
        return response.json();
    }catch(err){
        console.error("Error fetching data: "+err);
    }
}

async function formatData(){
    const user_id = "user_id"; //skapa user
    const data = await fetchRecipeData();
    return data.recipes.map(recipe => {
        let stepCounter = 0;
        return({
            name: recipe.name,
            prep_time: recipe.prepTimeMinutes,
            cook_time: recipe.cookTimeMinutes,
            author: user_id,
            servings: recipe.servings,
            tags: [
                ...recipe.tags
            ],
            calories: recipe.caloriesPerServing,
            ingredients: [
                recipe.ingredients.map(ingredient => {
                    return({
                        name: ingredient,
                        quantity_type: "",
                        quantity: 0
                    })
                })
            ],
            difficulty: recipe.difficulty,
            instructions: [
                recipe.instructions.map(instruction => {
                    stepCounter++;
                    return({
                        step: stepCounter,
                        text: instruction
                    })
                })
            ],
            rating: recipe.rating,
            review_count: recipe.reviewCount,
            image:{
                type: "link",
                url: recipe.image
            }
        })
    })
}

async function logRecipes(){
    const data = await formatData();
    data.forEach(recipe => {
        console.log(recipe)
        //insert into database
    })
}

logRecipes();