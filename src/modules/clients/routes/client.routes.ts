import { Router } from "express";
import { ClientController } from "../controller/client.controller";
import { ClientService } from "../service/client.service";
import { ClientRepository } from "../repository/client.repository";
import { AuthMiddleware } from "../../auth/middleware/auth.middleware";

const clientRepository = new ClientRepository();
const clientService = new ClientService(clientRepository);
const clientController = new ClientController(clientService);
const authMiddleware = new AuthMiddleware();
const clientRoutes = Router();

clientRoutes.post("/", authMiddleware.authenticate, clientController.create);
clientRoutes.get("/", authMiddleware.authenticate, clientController.list);

export { clientRoutes };