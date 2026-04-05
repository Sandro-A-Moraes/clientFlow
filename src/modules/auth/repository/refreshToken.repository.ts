import {prisma} from '../../../lib/prisma.js';

export class RefreshTokenRepository {
  public async create(data: { userId: string; tokenHash: string; expiresAt: Date }) {
    return await prisma.refreshToken.create({
      data,
    });
  }

  public async findByTokenHash(tokenHash: string) {
    return await prisma.refreshToken.findUnique({
      where: {
        tokenHash,
      },
    });
  }

  public async deleteByTokenHash(tokenHash: string) {
    return await prisma.refreshToken.delete({
      where: {
        tokenHash,
      },
    });
  }
}
