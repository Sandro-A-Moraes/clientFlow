import { prisma } from "../../../lib/prisma.js";
import type { User } from "../types/user.js";
import type { UserWithPassword } from "../types/user-with-password.js";

export class UserRepository {
  public async findByEmail(email: string): Promise<UserWithPassword | null> {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  public async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  public async create(data: { name: string; email: string; password: string, termsAccepted: boolean }): Promise<User> {
    return await prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        termsAccepted: true,
      },
    });
  }

}
