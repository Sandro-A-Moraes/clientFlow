import {prisma} from '../../../lib/prisma.js';
import type { RefreshToken } from "../types/refreshToken.js";

export class RefreshTokenRepository {
  public async create(data: { userId: string; tokenHash: string; expiresAt: Date }): Promise<RefreshToken> {
    return await prisma.refreshToken.create({
      data,
    });
  }

  public async findByTokenHash(tokenHash: string): Promise<RefreshToken | null> {
    return await prisma.refreshToken.findUnique({
      where: {
        tokenHash,
      },
    });
  }

  public async revokeByTokenHash(tokenHash: string): Promise<RefreshToken> {
    return await prisma.refreshToken.update({
      where: {
        tokenHash,
      }, data: {
        revokedAt: new Date(),
      }
    });
  }
}
