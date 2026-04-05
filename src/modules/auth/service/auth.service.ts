import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../shared/utils/generateToken.js";
import { UserRepository } from "../../user/repository/user.repository.js";
import bcrypt from "bcrypt";
import type { RefreshTokenRepository } from "../repository/refreshToken.repository.js";
import { hashToken } from "../../../shared/utils/hashToken.js";

export const TOKEN_EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

export class AuthService {
  private userRepository: UserRepository;
  private refreshTokenRepository: RefreshTokenRepository;

  constructor(
    userRepository: UserRepository,
    refreshTokenRepository: RefreshTokenRepository,
  ) {
    this.userRepository = userRepository;
    this.refreshTokenRepository = refreshTokenRepository;
  }

  public async register(data: {
    name: string;
    email: string;
    password: string;
    termsAccepted: boolean;
  }) {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
  }

  public async login(data: { email: string; password: string }) {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    const refreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    const tokenHash = hashToken(refreshToken);

    await this.refreshTokenRepository.create({
      userId: user.id,
      tokenHash,
      expiresAt: new Date(Date.now() + TOKEN_EXPIRATION_TIME),
    });

    return {
      accessToken,
      refreshToken,
      user: { id: user.id, name: user.name, email: user.email },
    };
  }
  
  public async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new Error("Refresh token is required");
    }

    const tokenHash = hashToken(refreshToken);
    const storedToken = await this.refreshTokenRepository.findByTokenHash(tokenHash);

    if (!storedToken) {
      throw new Error("Invalid refresh token");
    }

    if(storedToken.revokedAt) {
      throw new Error("Refresh token has been revoked");
    }

    if (storedToken.expiresAt < new Date()) {
      throw new Error("Refresh token has expired");
    }

    const user = await this.userRepository.findById(storedToken.userId);

    if (!user) {
      throw new Error("User not found");
    }

    await this.refreshTokenRepository.revokeByTokenHash(tokenHash);

    const newAccessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    const newRefreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    const newTokenHash = hashToken(newRefreshToken);

    await this.refreshTokenRepository.create({
      userId: user.id,
      tokenHash: newTokenHash,
      expiresAt: new Date(Date.now() + TOKEN_EXPIRATION_TIME),
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    };
  }

  public async me(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return { user: { id: user.id, name: user.name, email: user.email } };
  }
}
