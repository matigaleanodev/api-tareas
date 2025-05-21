import { auth } from "../../../config/firebase-admin";

interface FirebaseAuthError extends Error {
  code?: string;
}

/**
 * Servicio que maneja el registro y autenticación de usuarios.
 */
export class UserService {
  /**
   * Verifica si un usuario ya existe por email.
   * @param email Email del usuario
   * @returns Booleano si existe
   */
  async userExists(email: string): Promise<boolean> {
    try {
      await auth.getUserByEmail(email);
      return true;
    } catch (error) {
      const err = error as FirebaseAuthError;
      if (err.code === "auth/user-not-found") {
        return false;
      }
      throw error;
    }
  }

  /**
   * Logea un usuario existente generando un custom token.
   * @param email Email del usuario
   * @returns Token de autenticación
   */
  async login(email: string): Promise<string> {
    const user = await auth.getUserByEmail(email);
    return auth.createCustomToken(user.uid);
  }

  /**
   * Crea un nuevo usuario y genera un custom token.
   * @param email Email del nuevo usuario
   * @returns Token de autenticación
   */
  async register(email: string): Promise<string> {
    const user = await auth.createUser({ email });
    return auth.createCustomToken(user.uid);
  }
}
