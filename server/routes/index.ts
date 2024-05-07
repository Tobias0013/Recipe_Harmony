import { Router } from "express";

import usersRouter from './users';
import RecipeRouter from './recipe';
import sessionRouter from "./session";
import HouseholdRouter from './households';




const router: Router = Router();

router.use("/users", usersRouter);
router.use("/recipes", RecipeRouter);
router.use("/session", sessionRouter);

router.use("/households", HouseholdRouter);

export default router;
