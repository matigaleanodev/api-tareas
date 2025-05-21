import { Request, Response } from "express";
import { UserService } from "../service/user.service";

export class UserController {
  private userService = new UserService();

  async auth(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      if (!email) {
        res.status(400).json({ message: "Email es requerido" });
        return;
      }

      const exists = await this.userService.userExists(email);

      if (exists) {
        const token = await this.userService.login(email);
        res.json({ token });
      } else {
        res
          .status(200)
          .json({ message: "Usuario no existe", needsConfirmation: true });
      }
    } catch (error) {
      console.error("Error en auth:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async confirmUser(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      if (!email) {
        res.status(400).json({ message: "Email es requerido" });
        return;
      }

      const token = await this.userService.register(email);
      res.status(201).json({ token });
    } catch (error) {
      console.error("Error en confirmUser:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
}
