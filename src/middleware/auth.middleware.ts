import { RequestHandler } from "express";
import { auth } from "../config/firebase-admin";

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token de autenticación requerido" });
    return;
  }

  const token = authorization.split(" ")[1];

  try {
    const decodedToken = await auth.verifyIdToken(token);
    (req as any).userId = decodedToken.uid;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Token inválido" });
  }
};
