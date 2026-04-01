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
 *     description: Creates a client for the authenticated user.
 *     summary: Create a new client
 *     tags:
 *       - Clients
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Client data
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
 *               $ref: '#/components/schemas/ClientResponse'
 *                   $ref: '#/components/schemas/ClientResponse'
 *         $ref: '#/components/responses/BadRequest'
 *               $ref: '#/components/schemas/ErrorResponse'
 *         $ref: '#/components/responses/Unauthorized'
 *               $ref: '#/components/schemas/ErrorResponse'

/**
 * @openapi
 * /clients:
 *   get:
 *     summary: List clients
 *     description: Returns all clients for the authenticated user. Supports optional search by name.
 *     tags:
 *       - Clients
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *         description: Client name filter (contains, case-insensitive)
 *     responses:
 *       200:
 *         description: Clients retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ClientResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
 */

/**
 * @openapi
 * /clients/{id}:
 *   get:
 *     summary: Get client by id
 *     description: Returns a single client by id for the authenticated user.
 *     tags:
 *       - Clients
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Client id
 *     responses:
 *       200:
 *         description: Client retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClientResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

clientRoutes.post("/", authMiddleware.authenticate, clientController.create);
clientRoutes.get("/", authMiddleware.authenticate, clientController.list);
clientRoutes.get("/:id", authMiddleware.authenticate, clientController.getById);

export { clientRoutes };
