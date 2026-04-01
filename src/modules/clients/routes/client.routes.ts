import { Router } from "express";
import { ClientRepository } from "../repository/client.repository";
import { ClientService } from "../service/client.service";
import { ClientController } from "../controller/client.controller";
import { AuthMiddleware } from "../../auth/middleware/auth.middleware";

const clientRepository = new ClientRepository();
const clientService = new ClientService(clientRepository);
const clientController = new ClientController(clientService);
const authMiddleware = new AuthMiddleware();
const clientRoutes = Router();

/**
 * @openapi
 * /clients:
 *   post:
 *     summary: Create a new client
 *     tags:
 *       - Clients
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClientInput'
 *     responses:
 *       201:
 *         description: Client created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 client:
 *                   $ref: '#/components/schemas/ClientResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

clientRoutes.post("/", authMiddleware.authenticate, clientController.create);
clientRoutes.get("/", authMiddleware.authenticate, clientController.list);
clientRoutes.get("/:id", authMiddleware.authenticate, clientController.getById);

export { clientRoutes };
