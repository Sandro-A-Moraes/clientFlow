import { Router } from "express";
import { AppointmentController } from "../controller/appointment.controller";
import { AppointmentService } from "../service/appointment.service";
import { AppointmentRepository } from "../repository/appointment.repository";
import { AuthMiddleware } from "../../auth/middleware/auth.middleware";
import { ClientRepository } from "../../clients/repository/client.repository";

const appointmentRepository = new AppointmentRepository();
const clientRepository = new ClientRepository();
const appointmentService = new AppointmentService(
  appointmentRepository,
  clientRepository,
);
const appointmentController = new AppointmentController(appointmentService);
const authMiddleware = new AuthMiddleware();

const appointmentRouter = Router();

appointmentRouter.post(
  "/",
  authMiddleware.authenticate,
  appointmentController.create,
);

appointmentRouter.get(
  "/appointments?clientId=abc",
  authMiddleware.authenticate,
  appointmentController.listByClientId,
);

export { appointmentRouter };
