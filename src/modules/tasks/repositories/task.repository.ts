/* eslint-disable linebreak-style */
import { db } from "../../../config/firebase";
import { Task } from "../models/task.entity";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "@firebase/firestore";

const tasksCollection = collection(db, "tasks");

export class TaskRepository {
  private sanitizeTask(task: Task): Omit<Task, "userId"> {
    const { userId, ...rest } = task;
    return rest;
  }

  async getAll(userId: string): Promise<Omit<Task, "userId">[]> {
    const q = query(tasksCollection, where("userId", "==", userId));
    const snapshot = await getDocs(q);
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
    const docRef = doc(tasksCollection, id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) return null;

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
    const docRef = await addDoc(tasksCollection, task);
    return this.getById(docRef.id, task.userId);
  }

  async update(
    id: string,
    userId: string,
    taskData: Partial<Omit<Task, "id" | "userId" | "createdAt">>
  ): Promise<Omit<Task, "userId"> | null> {
    const existingTask = await this.getById(id, userId);
    if (!existingTask) return null;

    const docRef = doc(tasksCollection, id);
    await updateDoc(docRef, taskData);

    return this.getById(id, userId);
  }

  async delete(
    id: string,
    userId: string
  ): Promise<Omit<Task, "userId"> | null> {
    const taskToDelete = await this.getById(id, userId);
    if (!taskToDelete) return null;

    const docRef = doc(tasksCollection, id);
    await deleteDoc(docRef);

    return taskToDelete;
  }
}
