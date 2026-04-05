import { prisma } from "../../../lib/prisma.js";

export class UserRepository {
  public async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  public async findById(id: string) {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  public async create(data: { name: string; email: string; password: string, termsAccepted: boolean }) {
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
