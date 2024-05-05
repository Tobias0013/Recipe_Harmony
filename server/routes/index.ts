import { Router } from "express";

import usersRouter from './users';
import RecipeRouter from './recipe';


const router: Router = Router();

router.use("/users", usersRouter);
router.use("/recipes", RecipeRouter);

export default router;
