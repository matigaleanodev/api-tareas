import { IsEmail, IsNotEmpty } from "class-validator";
import { User } from "../models/user.model";

export class UserDto implements User {
  @IsEmail()
  @IsNotEmpty()
    email!: string;
}
