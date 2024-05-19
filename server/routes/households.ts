import express, { Router, Request, Response } from "express";
import { isValidObjectId } from "mongoose";

import HouseholdModel from "../mongoose/household";
import householdDB from '../controller/database/householdDB';
import verifyAdminJWT from "./middleware/admin_middle";
import verifyJWT from "./middleware/jwt_middle";

const HouseholdRouter: Router = Router();


HouseholdRouter.get('/all', verifyAdminJWT, async (req: Request, res: Response) => {
    const { error, households } = await householdDB.getAll();
    
    if (error){
        return res.status(500).json({ Error: "Internal Server Error" });
    }
    return res.json(households);
});

HouseholdRouter.get('/', verifyJWT, async (req: Request, res: Response) => {
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

HouseholdRouter.get("/:id", verifyJWT, async (req: Request, res: Response) => {
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

HouseholdRouter.get("/:id/ingredients", verifyJWT, async (req: Request, res: Response) =>{
    const { id: householdId } = req.params;
    
    if (!householdId || !isValidObjectId(householdId)) {
        return res.status(400).json({ Error: "Incorrect request params" })
    }

    const { error, household } = await householdDB.getById(householdId);

    if (error === 404){
        return res.status(404).json({ Error: "Household not found" });
    }
    else if (error || !household){
        return res.status(500).json({ Error: "Internal Server Error" });
    }

    return res.json(household.ingredients);
});

HouseholdRouter.get("/:id/shopping-list", verifyJWT, async (req: Request, res: Response) =>{
    const { id: householdId } = req.params;
    
    if (!householdId || !isValidObjectId(householdId)) {
        return res.status(400).json({ Error: "Incorrect request params" })
    }

    const { error, household } = await householdDB.getById(householdId);

    if (error === 404){
        return res.status(404).json({ Error: "Household not found" });
    }
    else if (error || !household){
        return res.status(500).json({ Error: "Internal Server Error" });
    }

    return res.json(household.shopping_list);
});

HouseholdRouter.post("/", verifyJWT, async (req: Request, res: Response) => {
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

HouseholdRouter.patch("/:id/shopping-list", verifyJWT, async (req: Request, res: Response) => {
    const { id } = req.params;
    let { shopping_list } = req.body;

    if (!id || !isValidObjectId(id)) {
        return res.status(400).json({Error: "400 param not valid id"})
    }
    
    if (!Array.isArray(shopping_list)) {
        return res.status(400).json({ Error: "Incorrect request body" });
    }

    for (const item of shopping_list) {
        if (
            typeof item.name !== "string" ||
            typeof item.quantity_type !== "string" ||
            typeof item.quantity !== "number"
        ) {
            return res.status(400).json({ Error: "Incorrect request body" });
        }
    }

    shopping_list = shopping_list.map(item => {
        return {name: item.name, quantity_type: item.quantity_type, quantity: item.quantity};
    })
    const { error, household } = await householdDB.updateShoppingList(id, shopping_list);

    if (error === 404){
        return res.status(404).json({ Error: "Household not found" });
    }
    else if (error || !household) {
        return res.status(500).json({ Error: "Internal Server Error" });
    }

    res.json({ shopping_list: household.shopping_list });
});

HouseholdRouter.delete('/:id', verifyJWT, async (req: Request, res: Response) => {
    try {
        const householdId = req.params.id;
        const { newHousegholdId, userId } = req.body;

        if (!newHousegholdId || !userId) {
            return res.status(400).json({ error: "request body incorrect" });
        }
        if (!householdId) {
            return res.status(400).json({ error: 'Household ID is required' });
        }
        //find new household
        const { error, household } = await householdDB.getById(newHousegholdId);
        if (error || !household) {
            return res.status(error === 404 ? 404 : 500)
            .json({ error: error === 404 ? "newHousehold not found" : "server error"});
        }
        // append new household with user id
        household.members.push(userId);
        household.save();

        // delete
        const deletedHousehold = await HouseholdModel.findByIdAndDelete(householdId);
        if (!deletedHousehold) {
            return res.status(404).json({ error: 'Household not found' });
        }
        res.json({ message: 'Household deleted successfully, new household', household });
    } catch (error) {
        console.error('Error deleting household:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default HouseholdRouter;
