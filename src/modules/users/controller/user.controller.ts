import { Request, Response } from "express";
import { UserService } from "../service/user.service";

export class UserController {
  private userService = new UserService();

  async auth(req: Request, res: Response) {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email es requerido" });
      }
      const token = await this.userService.loginOrRegister(email);
      return res.json({ token });
    } catch (error) {
      console.error("Error en auth:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }
}
