import { ClientService } from "../service/client.service";
import type { Response } from "express";
import type { AuthenticatedRequest } from "../../../shared/types/authenticatedRequest";

export class ClientController {
  private clientService: ClientService;

  constructor(clientService: ClientService) {
    this.clientService = clientService;
  }

  public create = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { name, email, phone, observations } = req.body;
      const userId = req.userId;

      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const client = await this.clientService.create({
        userId,
        name,
        email,
        phone,
        observations,
      });

      res.status(201).json(client);
    } catch (e) {
      if (e instanceof Error) {
        res.status(400).json({ message: e.message });
      } else {
        res.status(400).json({ message: "Unknown error" });
      }
    }
  };

  public list = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.userId;

      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const searchParam = req.query.search;

      let search: string | undefined;
      
      if(typeof searchParam === "string") {
        search = searchParam;
      } else if (Array.isArray(searchParam) && typeof searchParam[0] === "string") {
        search = searchParam[0];
      } else {
        search = undefined;
      }

      const clients = await this.clientService.list(userId, search);

      res.status(200).json(clients);
    } catch (e) {
      if (e instanceof Error) {
        res.status(400).json({ message: e.message });
      } else {
        res.status(400).json({ message: "Unknown error" });
      }
    }
  };
}
