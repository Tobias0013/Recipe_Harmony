import express, { Router, Request, Response } from "express";
import { isValidObjectId } from "mongoose";

import HouseholdModel from "../mongoose/household";
import householdDB from '../controller/database/householdDB';

const HouseholdRouter: Router = Router();

HouseholdRouter.get('/', async (req: Request, res: Response) => {
    try {
        const { limit, skip, tag, name, memberCountLess } = req.query;
        const query: any = {};
        if (tag) query.tags = { $in: Array.isArray(tag) ? tag : [tag] };
        if (typeof name === 'string') query.name = { $regex: new RegExp(name, 'i') }; 
        if (memberCountLess) query.member_count = { $lte: parseInt(memberCountLess as string) };
        
        const households = await HouseholdModel.find(query)
            .select('_id name tags member_count rating review_count image')
            .limit(limit ? parseInt(limit as string) : 10)
            .skip(skip ? parseInt(skip as string) : 0);
        
        res.json(households);
    } catch (error) {
      console.error('Error fetching households:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  HouseholdRouter.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      res.status(400).json({Error: "400 param not valid id"})
      return;
    }
    const { error, household } = await householdDB.getById(id);

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
