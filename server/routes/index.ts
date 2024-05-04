import { Router } from "express";

import usersRouter from './users';
import sessionRouter from "./session";

const router: Router = Router();

router.use("/users", usersRouter);
router.use("/session", sessionRouter);

export default router;
