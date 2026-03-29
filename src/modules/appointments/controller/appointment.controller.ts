import type { Response } from "express";
import type { AuthenticatedRequest } from "../../../shared/types/authenticatedRequest";
import { AppointmentService } from "../service/appointment.service";

export class AppointmentController {
  private appointmentService: AppointmentService;

  constructor(appointmentService: AppointmentService) {
    this.appointmentService = appointmentService;
  }

  public create = async (req: AuthenticatedRequest, res: Response) => {
    const { clientId, description, scheduledAt, status, notes } = req.body;

    if(!clientId || !description || !scheduledAt || !status) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const appointment = await this.appointmentService.create({
        userId,
        clientId,
        description,
        scheduledAt: new Date(scheduledAt),
        status,
        notes,
      });
      return res.status(201).json(appointment);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: "Unknown error" });
    }
  };

  public listByClientId = async (req: AuthenticatedRequest, res: Response) => {
    const clientIdParam = req.query.clientId;

    let clientId: string;

    if (typeof clientIdParam === "string") {
      clientId = clientIdParam;
    } else if (
      Array.isArray(clientIdParam) &&
      typeof clientIdParam[0] === "string"
    ) {
      clientId = clientIdParam[0];
    } else {
      return res.status(400).json({ message: "Invalid clientId parameter" });
    }

    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const appointments = await this.appointmentService.listByClientId(
        clientId,
        userId,
      );
      return res.status(200).json(appointments);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: "Unknown error" });
    }
  };
}
