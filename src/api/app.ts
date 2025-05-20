import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { Request, Response } from "express";
import taskRouter from "../modules/tasks/router/task.routes";
import userRouter from "../modules/users/router/user.routes";

const app = express();

app.use(cors({ origin: true }));
app.use(json());

app.use("/tasks", taskRouter);
app.use("/users", userRouter);

app.get("/", (_: Request, res: Response) => {
  res.send("API de tareas funcionando.");
});

export const apiTareas = app;
