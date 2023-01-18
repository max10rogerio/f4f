import { api } from "./api";

export class UserService {
  /**
   * Get the current user from the API and return it
   * Uses cookies to identify the user
   * Cookie Name: token
   */
  static async currentUser(token: string): Promise<CurrentUserResponse> {
    return api
      .get("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data);
  }
}

export type CurrentUserResponse = {
  id: string;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  role: string;
};
