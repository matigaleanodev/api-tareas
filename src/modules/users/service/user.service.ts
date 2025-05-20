import { auth } from "../../../config/firebase-admin";

/**
 * Registra o logea un usuario con solo email, genera un custom token.
 * Servicio que maneja el registro y authenticacion de usuarios
 */
export class UserService {
  /**
   * Registra o logea un usuario con solo email, genera un custom token.
   * @param email Email del usuario
   * @returns Token de autenticación Firebase Custom Token
   */
  async loginOrRegister(email: string): Promise<string> {
    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(email);
    } catch (error) {
      if ((error as any).code === "auth/user-not-found") {
        userRecord = await auth.createUser({ email });
      } else {
        throw error;
      }
    }
    const token = await auth.createCustomToken(userRecord.uid);
    return token;
  }
}
