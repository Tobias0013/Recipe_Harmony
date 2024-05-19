import household from '../../mongoose/household';
import HouseholdModel from '../../mongoose/household';
import userAPI from "../database/userDB";

/**
 * Adds a new household to the database.
 * @param {string} userId - The ID of the user creating the household.
 * @returns {Promise<{ error: number | null, household: any }>} - A promise that resolves to an object containing the error code (if any) and the newly created household.
 */
async function addHousehold(userId: string) {
    try {
        const res = await HouseholdModel.find().or([{owner: userId}, {members: [userId]}]);
        if (res.length > 0) {
            return { error: 409, res };
        }

        const owner = await userAPI.user.getUserData(userId);

        const newHousehold = new HouseholdModel({
            name: `${owner.fullName}'s Household`,
            owner: userId,
            members: [],
            shopping_list: [],
            ingredients: []
        });
        const household = await newHousehold.save();
        return { error: null, household };
    } 
    catch (e) {
        return { error: e, household: null };
    } 
}

/**
 * Retrieves a household by user ID.
 * @param userId - The ID of the user.
 * @returns {Promise<{ error: number | null, household: any }>} - An object containing the error (if any) and the retrieved household.
 */
async function getHouseholdByUserId(userId: string){
    try {
        const household = await HouseholdModel.findOne().or([{owner: userId}, {members: [userId]}]);
        if (!household) {
            return { error: 404, household };
        }
        return { error: null, household };
    } 
    catch (e) {
        return { error: e, household: null };
    } 
}

/**
 * Retrieves a household by its ID.
 * @param id - The ID of the household to retrieve.
 * @returns {Promise<{ error: number | null, household: any }>} - An object containing the error (if any) and the retrieved household.
 */
async function getHouseholdById(id: any) {
    try {
        const res = await HouseholdModel.findById(id);
        if (res) {
            return { error: null, household: res };
        } else {
            return { error: 404, household: null };
        }
    } catch (e) {
        return { error: e, household: null };
    }
}

/**
 * Retrieves an existing household for the given user ID or creates a new one if it doesn't exist.
 * @param userId The ID of the user.
 * @returns {Promise<{ error: number | null, household: any }>} - An object containing the error status and the household.
 */
async function getOrCreateHousehold (userId: string){
    const { error, household } = await getHouseholdByUserId(userId);
    
    if (!error && household) {
        return { error: null, household };
    }

    if (error !== 404) {
        return { error: 500, household: null };
    }
    const { error: newError, household: newHousehold } = await addHousehold(userId);
    
    if (newError || !newHousehold) {
        return { error: 500, household: null };
    }
    return { error: null, household: newHousehold };
}

/**
 * Updates the shopping list of a household.
 * @param id - The ID of the household.
 * @param shoppingList - The updated shopping list.
 * @returns An object containing the error (if any) and the updated household.
 */
async function updateShoppingList(id: string, shoppingList: any[]) {
    try {
        const household = await HouseholdModel.findById(id);
        if (!household) {
            return { error: 404, household };
        }
        household.shopping_list = shoppingList;
        household.save();

        return { error: null, household}
    } 
    catch (e) {
        return { error: e, household: null };
    }
}

/**
 * Retrieves all existing households.
 * @returns {Promise<{ error: number | null, households: any }>} - An object containing the error status and the households.
 */
async function getAll() {
    try {
        const households = await HouseholdModel.find();
        return { error: null, households };
    } 
    catch (e) {
        return { error: e, households: null };
    }
}

export default {
    add: addHousehold,
    getById: getHouseholdById,
    getByUserId: getHouseholdByUserId,
    getOrCreate: getOrCreateHousehold,
    updateShoppingList,
    getAll
};
