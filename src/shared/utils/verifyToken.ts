import jwt from "jsonwebtoken";
import type { TokenPayload } from "../types/tokenPayload.js";

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as TokenPayload;

    if (typeof decoded === "string") {
      throw new Error("Invalid token payload");
    }

    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
