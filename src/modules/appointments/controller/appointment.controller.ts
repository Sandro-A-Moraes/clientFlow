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
        const userId = req.userId!;

        if(!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        try {
            const appointment = await this.appointmentService.create({
                clientId,
                description,
                scheduledAt: new Date(scheduledAt),
                status,
                notes,
            });
            return res.status(201).json(appointment);
        } catch (error) {
            return res.status(400).json({ message: "Error creating appointment", error });
        }
    }

    public listByClientId = async (req: AuthenticatedRequest, res: Response) => {
        const { clientId } = req.params;

        if(typeof clientId !== "string") {
            return res.status(400).json({ message: "Invalid client ID" });
        }

        const userId = req.userId;

        if(!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        try {
            const appointments = await this.appointmentService.listByClientId(clientId);
            return res.status(200).json(appointments);
        } catch (error) {
            return res.status(400).json({ message: "Error fetching appointments", error });
        }
    }

}