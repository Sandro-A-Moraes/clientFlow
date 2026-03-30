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
});
