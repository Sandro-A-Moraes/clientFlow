import type { Request, Response } from "express";
import { AuthService } from "../service/auth.service";
import type { AuthenticatedRequest } from "../../../shared/types/authenticatedRequest";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public async register(req: Request, res: Response) {
    try {
      const user = await this.authService.register(req.body);
      res.status(201).json({ user, success: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(409).json({ message: error.message });
      } else {
        res.status(400).json({ message: "Erro desconhecido" });
      }
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const result = await this.authService.login(req.body);
      res.status(200).json({ ...result, success: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(401).json({ message: error.message });
      } else {
        res.status(400).json({ message: "Erro desconhecido" });
      }
    }
  }

  public async me(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId as string;

    try {
      const result = await this.authService.me(userId);
      res.status(200).json({ ...result, success: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(400).json({ message: "Erro desconhecido" });
      }
    }
  }
}
