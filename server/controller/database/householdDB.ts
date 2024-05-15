import household from '../../mongoose/household';
import HouseholdModel from '../../mongoose/household';

async function addHousehold(userId: string) {
    try {
        const res = await HouseholdModel.find().or([{owner: userId}, {members: [userId]}]);
        if (res.length > 0) {
            return { error: 409, res };
        }

        const newHousehold = new HouseholdModel({
            name: "household",
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

export default {
    add: addHousehold,
    getById: getHouseholdById,
    getByUserId: getHouseholdByUserId
};
