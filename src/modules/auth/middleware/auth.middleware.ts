import type { NextFunction, Response } from "express";
import { verifyToken } from "../../../shared/utils/verifyToken.js";
import type { AuthenticatedRequest } from "../../../shared/types/authenticatedRequest.js";

export class AuthMiddleware {
  public authenticate(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const [schema, token] = authHeader.split(" ");
    if (schema !== "Bearer" || !token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    try {
      const decoded = verifyToken(token);
      req.userId = decoded.userId;
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }

    next();
  }
}
