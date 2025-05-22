import { Request, Response } from "express";
import { UserService } from "../service/user.service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UserDto } from "../dto/user.dto";

export class UserController {
  private userService = new UserService();

  async auth(req: Request, res: Response): Promise<void> {
    try {
      const dto = plainToInstance(UserDto, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        res.status(400).json({ message: "Email inválido", errors });
      } else {
        const exists = await this.userService.userExists(dto.email);

        if (exists) {
          const token = await this.userService.login(dto.email);
          res.json({ token });
        } else {
          res
            .status(404)
            .json({ message: "Usuario no existe", needsConfirmation: true });
        }
      }
    } catch (error) {
      console.error("Error en auth:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async confirmUser(req: Request, res: Response): Promise<void> {
    try {
      const dto = plainToInstance(UserDto, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        res.status(400).json({ message: "Email inválido", errors });
      } else {
        const token = await this.userService.register(dto.email);
        res.status(201).json({ token });
      }
    } catch (error) {
      console.error("Error en confirmUser:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
}
