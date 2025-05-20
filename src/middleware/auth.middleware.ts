import { Request, Response, NextFunction } from "express";
import { auth } from "../config/firebase-admin";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Token de autenticación requerido" });
  }
  const token = authorization.split(" ")[1];
  try {
    const decodedToken = await auth.verifyIdToken(token);
    (req as any).userId = decodedToken.uid;
    next();
    return;
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
}
