import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { Request, Response } from "express";
import taskRouter from "../modules/tasks/router/task.routes";

const app = express();

app.use(cors({ origin: true }));
app.use(json());

app.use("/tasks", taskRouter);

app.get("/", (_: Request, res: Response) => {
  res.send("API de tareas funcionando.");
});

export const api = app;
