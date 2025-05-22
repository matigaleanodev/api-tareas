import { IsNotEmpty, IsString } from "class-validator";
import { Task } from "../models/task.entity";

export class CreateTaskDto implements Pick<Task, "title" | "description"> {
  @IsString()
  @IsNotEmpty()
    title!: string;

  @IsString()
  @IsNotEmpty()
    description!: string;
}
