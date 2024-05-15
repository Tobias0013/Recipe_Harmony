import HouseholdModel from '../../mongoose/household';

async function addHousehold(name: string, members: number) {
    try {
        const res = await HouseholdModel.find({ name: name });
        if (res.length > 0) {
            return { error: 409, res };
        }

        const newHousehold = new HouseholdModel({
            name,
            members
        });

        const household = await newHousehold.save();
        return { error: null, household };
    } catch (e) {
        return { error: e, household: null };
    }
}

async function getHouseholdById(id: any) {
    try {
        const res = await HouseholdModel.findById(id);
        if (res) {
            return {
                error: null,
                household: res
            };
        } else {
            return { error: 404, household: null };
        }
    } catch (e) {
        return { error: e, household: null};
    }
}

export default {
    add: addHousehold,
    getById: getHouseholdById
};
