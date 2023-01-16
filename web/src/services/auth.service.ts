import { api } from "./api";

export class AuthService {
  /**
   * Get CSRF token from Laravel Sanctum
   *
   * Required for Laravel Sanctum to work
   *
   * This method sets the CSRF token in the cookie of the browser
   */
  static async getCSRFToken(): Promise<void> {
    await api.get("/sanctum/csrf-cookie");
  }

  static async login(email: string, password: string): Promise<any> {
    return api.post(
      "/api/login",
      { email, password },
      {
        headers: {
          accept: "application/json",
        },
      }
    );
  }
}
