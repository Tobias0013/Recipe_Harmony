import express, { Router, Request, Response } from "express";
import { isValidObjectId } from "mongoose";

import HouseholdModel from "../mongoose/household";
import householdDB from '../controller/database/householdDB';

const HouseholdRouter: Router = Router();


HouseholdRouter.get('/', async (req: Request, res: Response) => {
    const { user_id: userId } = req.body;
    
    if (!userId || !isValidObjectId(userId)) {
        return res.status(400).json({ Error: "Incorrect request body" })
    }

    const { error, household } = await householdDB.getByUserId(userId)

    if (error === 404){
        return res.status(404).json({ Error: "Household not found" });
    }
    else if (error){
        return res.status(500).json({ Error: "Internal Server Error" });
    }

    return res.json(household);
});

HouseholdRouter.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        res.status(400).json({Error: "400 param not valid id"})
        return;
    }
    const { error, household } = await (householdDB as any).getById(id);

    if (error === -1) {
        res.status(400).json({Error: "400 household does not exist"});
        return;
    }
    else if (error) {
        res.status(500).json({Error: "500 internal server error"});
        return;
    }
    res.json(household);
});



HouseholdRouter.post("/", async (req: Request, res: Response) => {
    const { user_id: userId } = req.body;
    
    if (!userId || !isValidObjectId(userId)) {
        return res.status(400).json({ Error: "Incorrect request body" })
    }

    const { error, household } = await householdDB.add(userId);

    if (error === 409){
        return res.status(409).json({ Error: "user_id already in a household" });
    }
    else if (error){
        return res.status(500).json({ Error: "Internal Server Error" });
    }

    return res.json(household);
});

HouseholdRouter.patch("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        if (!isValidObjectId(id)) {
            res.status(400).json({Error: "400 param not valid id"})
            return;
        }
        const updatedHousehold = await HouseholdModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedHousehold) {
            res.status(404).json({ Error: "404 household not found" });
            return;
        }
        res.json(updatedHousehold);
    } catch (error) {
        console.error('Error updating household:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

HouseholdRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const householdId = req.params.id;
        if (!householdId) {
            return res.status(400).json({ error: 'Household ID is required' });
        }
        const deletedHousehold = await HouseholdModel.findByIdAndDelete(householdId);
        if (!deletedHousehold) {
            return res.status(404).json({ error: 'Household not found' });
        }
        res.json({ message: 'Household deleted successfully' });
    } catch (error) {
        console.error('Error deleting household:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default HouseholdRouter;
