import { Router } from "express";

import employeesRouter from './employees';
import assignmentRouter from './assignments';
import projectRouter from './project';

const router = Router();

router.use("/employees", employeesRouter);
router.use("/project_assignments", assignmentRouter);
router.use("/projects", projectRouter);

export default router;
