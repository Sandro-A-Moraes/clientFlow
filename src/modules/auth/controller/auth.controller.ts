import type { Request, Response } from "express";
import { AuthService } from "../service/auth.service.js";
import type { AuthenticatedRequest } from "../../../shared/types/authenticatedRequest.js";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public register = async (req: Request, res: Response) => {
    try {
      const user = await this.authService.register(req.body);
      res.status(201).json({ user, success: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(409).json({ message: error.message });
      } else {
        res.status(400).json({ message: "Unknown error" });
      }
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const result = await this.authService.login(req.body);
      res.status(200).json({ ...result, success: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(401).json({ message: error.message });
      } else {
        res.status(400).json({ message: "Unknown error" });
      }
    }
  };

  public me = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const userId = req.userId;

    try {
      const result = await this.authService.me(userId);
      res.status(200).json({ ...result, success: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(400).json({ message: "Unknown error" });
      }
    }
  };
}
