type recipeData = {
    author?: any;
    name: string;
    prep_time: string;
    cook_time: string;
    servings: string;
    tags: string[];
    calories: string;
    ingredients: {
        name: string;
        quantity: string;
        quantity_type: string;
    }[];
    difficulty: string;
    instructions: {
        step: string;
        text: string;
    }[];
    image: {
        type: string;
        url: string;
        base64: string;
    };
}


export default (recipeData: recipeData) =>{
    
    const errors: string[] = [];

    !recipeData.name && errors.push("Name need to be filled.");
    
    if (!recipeData.prep_time) {
        errors.push("Prep time need to be filled");
    }
    else if (Number.isNaN(Number.parseInt(recipeData.prep_time))){
        console.log("DEBUG-fel", recipeData.prep_time);
        console.log("DEBUG-fel", Number.isInteger(recipeData.prep_time));

        errors.push("Prep time need to be a number (time in min).");
    }

    if (!recipeData.cook_time) {
        errors.push("Cook time need to be filled");
    }
    else if (Number.isNaN(Number.parseInt(recipeData.cook_time))){        
        errors.push("Cook time need to be a number (time in min).");
    }

    if (!recipeData.servings){
        errors.push("Servings need to be filled");
    }
    else if (Number.isNaN(Number.parseInt(recipeData.servings))){
        errors.push("Servings need to be a number.");
    }

    if (recipeData.calories && Number.isNaN(Number.parseInt(recipeData.calories))){
        errors.push("Calories need to be a number.");
    }

    // Filter out empty ingredients
    const newIngredients = recipeData.ingredients.filter(ingredient => {
        if (!ingredient.name && !ingredient.quantity && !ingredient.quantity_type) {
            return false;
        }
        return true;
    });

    if (newIngredients.length === 0) {
        errors.push("Add at least one ingredient.")
    }

    const errorIngredients = ["", "", "", ""];

    for (const ingredient of newIngredients) {
        if (!ingredient.name) {
            errorIngredients[0] === "" && 
            (errorIngredients[0] = "Ingredient name need to be filled for non empty ingredients.");
        }
        if (!ingredient.quantity_type) {
            errorIngredients[1] === "" && 
            (errorIngredients[1] = "Ingredient type need to be filled for non empty ingredients.");
        }
        if (!ingredient.quantity) {
            errorIngredients[2] === "" && 
            (errorIngredients[2] = "Ingredient quantity need to be filled for non empty ingredients.");
        }
        else if (Number.isNaN(Number.parseInt(ingredient.quantity))){
            errorIngredients[3] === "" && 
            (errorIngredients[3] = "Ingredient quantity need to be a number for non empty ingredients.");
        }
    }

    errorIngredients.forEach(error => {
        error && errors.push(error);
    });

    if (recipeData.difficulty !== "easy" &&
        recipeData.difficulty !== "normal" &&
        recipeData.difficulty !== "hard" ) {
            errors.push("Difficulty need to be a selected.")
    }

    const newInstructions = recipeData.instructions.filter(instruction => {
        if (!instruction.text) {
            return false;
        }
        return true;
    });

    if (newInstructions.length === 0) {
        errors.push("Add at least one instruction.")
    }

    if (!recipeData.image.base64) {
        errors.push("An image need to be selected");
    }

    if (errors.length > 0) {
        return { errors, data: null };
    }
    recipeData.ingredients = newIngredients;
    recipeData.instructions = newInstructions;
    
    return { errors: null, data: recipeData};
}