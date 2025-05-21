import { Request, Response } from "express";
import { TaskService } from "../services/task.service";

export class TaskController {
  private taskService = new TaskService();

  async getAll(req: Request, res: Response) {
    if (!req.userId) {
      res.status(401).json({ message: "No autorizado" });
    } else {
      try {
        const tasks = await this.taskService.getAll(req.userId);
        res.json(tasks);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener tareas" });
      }
    }
  }

  async getById(req: Request, res: Response) {
    if (!req.userId) {
      res.status(401).json({ message: "No autorizado" });
    } else {
      try {
        const { id } = req.params;
        const task = await this.taskService.getById(id, req.userId);
        res.json(task);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener tarea" });
      }
    }
  }

  async create(req: Request, res: Response) {
    if (!req.userId) {
      res.status(401).json({ message: "No autorizado" });
    } else {
      try {
        const taskData = { ...req.body, userId: req.userId };
        const task = await this.taskService.create(taskData);
        res.status(201).json(task);
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error al crear tarea" });
      }
    }
  }

  async update(req: Request, res: Response) {
    if (!req.userId) {
      res.status(401).json({ message: "No autorizado" });
    } else {
      try {
        const { id } = req.params;
        const data = req.body;
        const task = await this.taskService.update(id, req.userId, data);
        res.json(task);
      } catch (error) {
        console.log(error);
        res.status(404).json({ message: "Error al editar tarea" });
      }
    }
  }

  async delete(req: Request, res: Response) {
    if (!req.userId) {
      res.status(401).json({ message: "No autorizado" });
    } else {
      try {
        const { id } = req.params;
        const task = await this.taskService.delete(id, req.userId);
        res.json(task);
      } catch (error) {
        console.log(error);
        res.status(404).json({ message: "Error al eliminar tarea" });
      }
    }
  }
}
