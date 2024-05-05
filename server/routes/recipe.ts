import express, { Router, Request, Response } from "express";
import { isValidObjectId } from "mongoose";

import RecipeModel from "../mongoose/recipe";
import recipeDB from '../controller/database/recipeDB';

const RecipeRouter: Router = Router();

RecipeRouter.get('/', async (req: Request, res: Response) => {
    try {
        const { limit, skip, tag, name, cookTimeLess } = req.query;
        const query: any = {};
        if (tag) query.tags = { $in: Array.isArray(tag) ? tag : [tag] };
        if (typeof name === 'string') query.name = { $regex: new RegExp(name, 'i') }; 
        if (cookTimeLess) query.cook_time = { $lte: parseInt(cookTimeLess as string) };
        
        const recipes = await RecipeModel.find(query)
            .select('_id name tags cook_time rating review_count image')
            .limit(limit ? parseInt(limit as string) : 10)
            .skip(skip ? parseInt(skip as string) : 0);
        
        res.json(recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  RecipeRouter.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      res.status(400).json({Error: "400 parm not valid id"})
      return;
    }
    const { error, recipe } = await recipeDB.getById(id);

    if (error === -1) {
      res.status(400).json({Error: "400 user does not exist"});
      return;
    }
    else if (error) {
      res.status(500).json({Error: "500 internal server error"});
      return;
    }
    res.json(recipe);
  });

RecipeRouter.delete('/recipes/:id', async (req: Request, res: Response) => {
    try {
      const recipeId = req.params.id;
      if (!recipeId) {
        return res.status(400).json({ error: 'Recipe ID is required' });
      }
      const deletedRecipe = await RecipeModel.findByIdAndDelete(recipeId);
      if (!deletedRecipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
      console.error('Error deleting recipe:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  export default RecipeRouter;