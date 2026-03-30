import { describe, it, expect, vi } from "vitest";
import { AppointmentService } from "./appointment.service";

describe("AppointmentService", () => {
  it("should create appointment when data is valid", async () => {
    const clientRepository = {
      findByIdAndUserId: vi.fn().mockResolvedValue({ id: "cliente-1" }),
    };

    const appointmentRepository = {
      create: vi.fn().mockResolvedValue({ id: "1" }),
    };

    const service = new AppointmentService(
      appointmentRepository as any,
      clientRepository as any,
    );

    const input = {
      userId: "user-1",
      clientId: "client-1",
      description: "Consulta",
      scheduledAt: "2026-03-30T10:00:00.000Z",
      status: "pending",
    };

    const result = await service.create(input);

    expect(result).toEqual({ id: "1" });

    expect(clientRepository.findByIdAndUserId).toHaveBeenCalledWith(
      "client-1",
      "user-1",
    );

    expect(appointmentRepository.create).toHaveBeenCalledWith({
      clientId: "client-1",
      description: "Consulta",
      scheduledAt: expect.any(Date),
      status: "pending",
    });
  });

  it("should throw error when client does not belong to user", async () => {
    const clientRepository = {
      findByIdAndUserId: vi.fn().mockResolvedValue(null),
    };

    const appointmentRepository = {
      create: vi.fn(),
    };

    const service = new AppointmentService(
      appointmentRepository as any,
      clientRepository as any,
    );

    const input = {
      userId: "user-1",
      clientId: "client-1",
      description: "Consulta",
      scheduledAt: "2026-03-30T10:00:00.000Z",
      status: "pending",
    };

    await expect(service.create(input)).rejects.toThrow("Client not found");

    expect(clientRepository.findByIdAndUserId).toHaveBeenCalledWith(
      "client-1",
      "user-1",
    );

    expect(appointmentRepository.create).not.toHaveBeenCalled();
  });

  it("should throw error when scheduledAt is invalid", async () => {
    const clientRepository = { findByIdAndUserId: vi.fn() };

    const appointmentRepository = { create: vi.fn() };

    const service = new AppointmentService(
      appointmentRepository as any,
      clientRepository as any,
    );

    const input = {
      userId: "user-1",
      clientId: "client-1",
      description: "Consulta",
      scheduledAt: "INVALID DATE",
      status: "pending",
    };

    await expect(service.create(input)).rejects.toThrow("Invalid scheduledAt date");

    expect(clientRepository.findByIdAndUserId).not.toHaveBeenCalled();

    expect(appointmentRepository.create).not.toHaveBeenCalled();
  });

  it("should return appointments when client belongs to user", async () => {
    const clientRepository = {
      findByIdAndUserId: vi.fn().mockResolvedValue({ id: "client-1" }),
    };

    const appointments = [
      {
        id: "1",
        description: "Consulta",
        scheduledAt: new Date("2026-03-30T10:00:00.000Z"),
        status: "pending",
      },
      {
        id: "2",
        description: "Retorno",
        scheduledAt: new Date("2026-03-31T10:00:00.000Z"),
        status: "confirmed",
      },
    ];


    const appointmentRepository = {
      findManyByClientId: vi.fn().mockResolvedValue(appointments),
    };

    const service = new AppointmentService(
      appointmentRepository as any,
      clientRepository as any,
    );

    const result = await service.listByClientId("client-1", "user-1");

    expect(result).toEqual(appointments);

    expect(clientRepository.findByIdAndUserId).toHaveBeenCalledWith(
      "client-1",
      "user-1",
    );

    expect(appointmentRepository.findManyByClientId).toHaveBeenCalledWith(
      "client-1",
    );
  });

  it("should throw error when listing appointments for client that does not belong to user", async () => {
    const clientRepository = {
      findByIdAndUserId: vi.fn().mockResolvedValue(null),
    }

    const appointmentRepository = {
      findManyByClientId: vi.fn(),
    };

    const service = new AppointmentService(
      appointmentRepository as any,
      clientRepository as any,
    );

    await expect(service.listByClientId("client-1", "user-1")).rejects.toThrow(
      "Client not found",
    );

    expect(clientRepository.findByIdAndUserId).toHaveBeenCalledWith(
      "client-1",
      "user-1",
    );

    expect(appointmentRepository.findManyByClientId).not.toHaveBeenCalled();
  
  });
});
