import type { NextFunction, Request, Response } from "express";
import { AppError } from "../../../shared/errors/AppError.js";
import { Prisma } from "../../../generated/prisma/client.js";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error("[Error]", err.message, err.stack);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code == "P2002") {
      return res.status(409).json({ error: "This value already exists" });
    }

    return res.status(500).json({ error: "Database operation failed" });
  }

  return res.status(500).json({
    error: "Internal server error",
  });
}
