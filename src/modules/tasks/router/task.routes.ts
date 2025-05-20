import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { authMiddleware } from "../../../middleware/auth.middleware";

const taskRouter = Router();
const taskController = new TaskController();

taskRouter.use(authMiddleware);

taskRouter.get("/", (req, res) => taskController.getAll(req, res));
taskRouter.get("/:id", (req, res) => taskController.getById(req, res));
taskRouter.post("/", (req, res) => taskController.create(req, res));
taskRouter.put("/:id", (req, res) => taskController.update(req, res));
taskRouter.delete("/:id", (req, res) => taskController.delete(req, res));

export default taskRouter;
