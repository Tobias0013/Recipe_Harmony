import Recipe from '../../mongoose/recipe';
import User from "../../mongoose/user";

/**
 * Retrieves a recipe by its ID from the database.
 * @param {string} Id - The ID of the recipe to retrieve.
 * @returns {Promise<{ error: any; recipe: any; }>} - A promise that resolves to an object containing the error (if any) and the retrieved recipe.
 */
async function getById(Id: string): Promise<{ error: any; recipe: any; }> {
    try {
        const recipe = await Recipe.findById(Id);
        if (!recipe) return {error: 404, recipe: null};

        const user = await User.findById(recipe.author)
        if (!user) return {error: 500, recipe: null};

        return {error: null, recipe: {
            ...recipe.toObject(),
            author: { ...user.toObject() }
        }};
    } 
    catch (e) {
        return {error: e, recipe: null}    
    }
}

export default {
    getById
}