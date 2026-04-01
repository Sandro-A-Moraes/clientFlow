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

/**
 * @openapi
 * /appointments:
 *   post:
 *     summary: Create an appointment
 *     description: Creates an appointment for a client belonging to the authenticated user.
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Appointment data
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AppointmentInput'
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppointmentResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
appointmentRouter.post(
  "/",
  authMiddleware.authenticate,
  appointmentController.create,
);

/**
 * @openapi
 * /appointments:
 *   get:
 *     summary: List appointments by client
 *     description: Returns appointments for a client belonging to the authenticated user.
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: Client id
 *     responses:
 *       200:
 *         description: Appointments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AppointmentResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
appointmentRouter.get(
  "/",
  authMiddleware.authenticate,
  appointmentController.listByClientId,
);

export { appointmentRouter };
