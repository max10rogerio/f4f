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
    return api.post("/api/auth/login", { email, password });
  }

  static async register(
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<any> {
    return api
      .post("/api/auth/register", {
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      })
      .then((response) => response.data);
  }

  static async resendCode(email: string): Promise<void> {
    await api.post("/api/auth/resend-code", { email });
  }

  static async verifyCode(email: string, code: string): Promise<void> {
    await api.post("/api/auth/verify-code", { email, code });
  }
}
