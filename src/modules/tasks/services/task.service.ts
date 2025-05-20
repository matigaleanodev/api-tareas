import { Task } from "../models/task.entity";
import { TaskRepository } from "../repositories/task.repository";

/**
 * Servicio que maneja la lógica de negocio relacionada con las tareas.
 * Orquesta la creación, obtención, actualización y eliminación de tareas.
 */
export class TaskService {
  private readonly repository = new TaskRepository();

  /**
   * Obtiene todas las tareas asociadas a un usuario.
   * @param userId ID del usuario
   * @returns Lista de tareas sin userId
   */
  async getAll(userId: string): Promise<Omit<Task, "userId">[]> {
    return this.repository.getAll(userId);
  }

  /**
   * Obtiene una tarea por su ID y usuario.
   * @param id ID de la tarea
   * @param userId ID del usuario
   * @returns Tarea encontrada sin userId
   */
  async getById(id: string, userId: string): Promise<Omit<Task, "userId">> {
    const task = await this.repository.getById(id, userId);
    if (!task) {
      throw new Error(`No se encontró la tarea con id ${id} para el usuario.`);
    }
    return task;
  }

  /**
   * Crea una nueva tarea para un usuario.
   * @param task Datos de la tarea a crear (incluye userId)
   * @returns Tarea creada sin userId
   */
  async create(
    task: Omit<Task, "id" | "createdAt">
  ): Promise<Omit<Task, "userId">> {
    const createdTask = await this.repository.create(task);
    if (!createdTask) {
      throw new Error("No se pudo crear la tarea.");
    }
    return createdTask;
  }

  /**
   * Actualiza los datos de una tarea existente.
   * @param id ID de la tarea
   * @param userId ID del usuario
   * @param data Datos a actualizar
   * @returns Tarea actualizada sin userId
   */
  async update(
    id: string,
    userId: string,
    data: Partial<Omit<Task, "id" | "userId" | "createdAt">>
  ): Promise<Omit<Task, "userId">> {
    const updatedTask = await this.repository.update(id, userId, data);
    if (!updatedTask) {
      throw new Error(`No se encontró la tarea con id ${id} para actualizar.`);
    }
    return updatedTask;
  }

  /**
   * Elimina una tarea específica.
   * @param id ID de la tarea
   * @param userId ID del usuario
   * @returns Tarea eliminada sin userId
   */
  async delete(id: string, userId: string): Promise<Omit<Task, "userId">> {
    const deletedTask = await this.repository.delete(id, userId);
    if (!deletedTask) {
      throw new Error(`No se encontró la tarea con id ${id} para eliminar.`);
    }
    return deletedTask;
  }
}
