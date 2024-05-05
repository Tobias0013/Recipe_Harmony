import Recipe from '../../mongoose/recipe';

/**
 * Retrieves a recipe by its ID from the database.
 * @param {string} Id - The ID of the recipe to retrieve.
 * @returns {Promise<{ error: any; recipe: any; }>} - A promise that resolves to an object containing the error (if any) and the retrieved recipe.
 */
async function getById(Id: string): Promise<{ error: any; recipe: any; }> {
    try {
        const recipe = await Recipe.findById(Id)

        return recipe ? {error: null, recipe: recipe} : {error: -1, recipe: null};      
    } 
    catch (e) {
        return {error: e, recipe: null}    
    }
}

export default {
    getById
}