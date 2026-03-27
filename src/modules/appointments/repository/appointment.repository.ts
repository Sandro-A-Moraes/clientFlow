import { prisma } from "../../../lib/prisma";

export class AppointmentRepository {
  async create(data: {
    clientId: string;
    description: string;
    scheduledAt: Date;
    status: string;
    notes?: string;
  }) {
    return prisma.appointment.create({
      data,
      select: {
        id: true,
        clientId: true,
        description: true,
        scheduledAt: true,
        status: true,
        notes: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findManyByClientId(clientId: string) {
    return prisma.appointment.findMany({
      where: {
        clientId,
      },
      orderBy: {
        scheduledAt: "desc",
      },
    });
  }
}
