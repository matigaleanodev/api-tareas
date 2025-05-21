import { Router } from "express";
import { UserController } from "../controller/user.controller";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/auth", (req, res) => userController.auth(req, res));
userRouter.post("/auth/confirm", (req, res) =>
  userController.confirmUser(req, res)
);

export default userRouter;
