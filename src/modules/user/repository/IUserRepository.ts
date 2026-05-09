import type { UserWithPassword } from "../types/user-with-password.js";
import type { User } from "../types/user.js";

export interface IUserRepository {
  findByEmail(email: string): Promise<UserWithPassword | null>;
  findById(id: string): Promise<User | null>;
  create(data: { name: string; email: string; password: string, termsAccepted: boolean }): Promise<User>;
}