import { prisma } from "../../../lib/prisma.js";

export class ClientRepository {
  async create(data: {
    userId: string;
    name: string;
    email: string;
    phone: string;
    notes?: string;
  }) {
    return prisma.client.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        notes: true,
      },
    });
  }

  async findMany(userId: string, search?: string) {
    return prisma.client.findMany({
      where: {
        userId,
        ...(search && {
          name: {
            contains: search,
            mode: "insensitive",
          },
        }),
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findByIdAndUserId(clientId: string, userId: string) {
    return prisma.client.findFirst({
      where: {
        id: clientId,
        userId,
      },
    });
  }
}
