/* eslint-disable linebreak-style */

import { db } from "../../../config/firebase-admin";
import { Task } from "../models/task.entity";

export class TaskRepository {
  private readonly tasksCollection = db.collection("tasks");

  private sanitizeTask(task: Task): Omit<Task, "userId"> {
    const { id, title, description, createdAt, completed } = task;
    return { id, title, description, createdAt, completed };
  }

  async getAll(userId: string): Promise<Omit<Task, "userId">[]> {
    const snapshot = await this.tasksCollection
      .where("userId", "==", userId)
      .get();

    return snapshot.docs
      .map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<Task, "id">),
      }))
      .filter((task) => task.userId === userId)
      .map((task) => this.sanitizeTask(task as Task));
  }

  async getById(
    id: string,
    userId: string
  ): Promise<Omit<Task, "userId"> | null> {
    const docRef = this.tasksCollection.doc(id);
    const snapshot = await docRef.get();

    if (!snapshot.exists) return null;

    const task = {
      id: snapshot.id,
      ...(snapshot.data() as Omit<Task, "id">),
    } as Task;

    if (task.userId !== userId) return null;

    return this.sanitizeTask(task);
  }

  async create(
    task: Omit<Task, "id" | "createdAt">
  ): Promise<Omit<Task, "userId"> | null> {
    const createdAt = new Date().toISOString();
    const docRef = await this.tasksCollection.add({ ...task, createdAt });
    const newTask = this.getById(docRef.id, task.userId);

    return newTask;
  }

  async update(
    id: string,
    userId: string,
    taskData: Partial<Omit<Task, "id" | "userId" | "createdAt">>
  ): Promise<Omit<Task, "userId"> | null> {
    const existingTask = await this.getById(id, userId);
    if (!existingTask) return null;

    const docRef = this.tasksCollection.doc(id);
    await docRef.update(taskData);

    return this.getById(id, userId);
  }

  async delete(
    id: string,
    userId: string
  ): Promise<Omit<Task, "userId"> | null> {
    const taskToDelete = await this.getById(id, userId);
    if (!taskToDelete) return null;

    const docRef = this.tasksCollection.doc(id);
    await docRef.delete();

    return taskToDelete;
  }
}
