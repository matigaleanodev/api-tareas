import { Router } from "express";
import { UserController } from "../controller/user.controller";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/auth", async (req, res, next) => {
  try {
    await userController.auth(req, res);
  } catch (err) {
    next(err);
  }
});

export default userRouter;
