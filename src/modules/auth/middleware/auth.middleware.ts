import type { NextFunction, Response } from "express";
import { verifyToken } from "../../../shared/utils/verifyToken.js";
import type { AuthenticatedRequest } from "../../../shared/types/authenticatedRequest.js";

export class AuthMiddleware {
  public authenticate(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    try {
      const decoded = verifyToken(token);

      req.userId = decoded.userId;

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
  }
}
