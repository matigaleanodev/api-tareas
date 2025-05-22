/* eslint-disable linebreak-style */
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
} from "class-validator";

export class UpdateTaskDto {
  @IsUUID()
    id!: string;

  @IsString()
  @IsNotEmpty()
    title!: string;

  @IsString()
  @IsNotEmpty()
    description!: string;

  @IsDateString()
    createdAt!: string;

  @IsBoolean()
    completed!: boolean;
}
