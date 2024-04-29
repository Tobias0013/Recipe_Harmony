require('dotenv').config()
const { MongoClient } = require("mongodb");

async function fetchRecipeData(){
    try{
        const response = await fetch("https://dummyjson.com/recipes?skip=0&limit=0")
        return response.json();
    }catch(err){
        console.error("Error fetching data: "+err);
    }
}

async function formatData(){
    const data = await fetchRecipeData();
    return data.recipes.map(recipe => {
        let stepCounter = 0;
        return({
            name: recipe.name,
            prep_time: recipe.prepTimeMinutes,
            cook_time: recipe.cookTimeMinutes,
            author: "662fcd37aa94785cbe8a847d",
            servings: recipe.servings,
            tags: [
                ...recipe.tags
            ],
            calories: recipe.caloriesPerServing,
            ingredients: 
                recipe.ingredients.map(ingredient => {
                    return({
                        name: ingredient,
                        quantity_type: "",
                        quantity: 0
                    })
                })
            ,
            difficulty: recipe.difficulty,
            instructions: 
                recipe.instructions.map(instruction => {
                    stepCounter++;
                    return({
                        step: stepCounter,
                        text: instruction
                    })
                })
            ,
            rating: recipe.rating,
            review_count: recipe.reviewCount,
            image:{
                type: "link",
                url: recipe.image
            }
        })
    })
}


async function insertDocument(){
    const client = new MongoClient(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true });

    try{
        await client.connect();
        const db = client.db();
        const data = await formatData();
        for (const recipe of data){
            const result = await db.collection('Recipes').insertOne(recipe);
            console.log(result)
        }

    }catch(err){
        console.error("Error inserting doc: "+err);
    }finally{
        await client.close();
    }
}

insertDocument();