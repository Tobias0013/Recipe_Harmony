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

/**
 * Increments the review count of a recipe by 1.
 * @param {string} Id - The ID of the recipe.
 * @returns {Promise<{ error: number | null, reviewCount: number | null }>} - An object containing the error status and the updated review count.
 */
async function incrementReviewCount(Id: string) {
    try {
        const reviewCount = await Recipe.findById(Id).select("review_count");
        if (!reviewCount) return {error: 404, reviewCount: null};

        reviewCount.review_count += 1;
        reviewCount.save();

        return { error: null, reviewCount: reviewCount.review_count };
    } 
    catch (e) {
        return {error: e, reviewCount: null}    
    }
}

/**
 * Decrement the review count of a recipe by 1.
 * @param {string} Id - The ID of the recipe.
 * @returns {Promise<{ error: number | null, reviewCount: number | null }>} - An object containing the error status and the updated review count.
 */
async function decrementReviewCount(Id: string) {
    try {
        const reviewCount = await Recipe.findById(Id).select("review_count");
        if (!reviewCount) return {error: 404, reviewCount: null};

        reviewCount.review_count -= 1;
        reviewCount.save();

        return { error: null, reviewCount: reviewCount.review_count };
    } 
    catch (e) {
        return {error: e, reviewCount: null}    
    }
}


export default {
    getById,
    incrementReviewCount,
    decrementReviewCount
}