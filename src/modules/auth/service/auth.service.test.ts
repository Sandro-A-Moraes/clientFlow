import { describe, it, expect, vi } from "vitest";
import { AuthService } from "./auth.service.js";
import bcrypt from "bcrypt";

describe("AuthService", () => {
  it("should register user with valid credentials", async () => {
    const userRepository = {
      findByEmail: vi.fn().mockResolvedValue(null),
      findById: vi.fn().mockResolvedValue(null),
      create: vi.fn().mockResolvedValue({
        id: "user-1",
        name: "John Doe",
        email: "user@example.com",
        termsAccepted: true,
      }),
    };

    const refreshTokenRepository = {
      findByTokenHash: vi.fn().mockResolvedValue(null),
      create: vi.fn(),
      revokeByTokenHash: vi.fn(),
    };

    vi.spyOn(bcrypt, "hash").mockImplementation(async () => "hashed-password");

    const authService = new AuthService(userRepository, refreshTokenRepository);

    const input = {
      name: "John Doe",
      email: "user@example.com",
      password: "password",
      termsAccepted: true,
    };

    const result = await authService.register(input);

    expect(result).toEqual({
      id: "user-1",
      name: "John Doe",
      email: "user@example.com",
      termsAccepted: true,
    });

    expect(userRepository.findByEmail).toHaveBeenCalledWith("user@example.com");
    expect(userRepository.findById).not.toHaveBeenCalled();

    expect(userRepository.create).toHaveBeenCalledWith({
      name: "John Doe",
      email: "user@example.com",
      password: "hashed-password",
      termsAccepted: true,
    });

    expect(bcrypt.hash).toHaveBeenCalledWith("password", expect.any(Number));
  });

  it("should login user with valid credentials", async () => {
    const userRepository = {
      findByEmail: vi.fn().mockResolvedValue({
        id: "user-1",
        name: "John Doe",
        email: "user@example.com",
        password: "hashed-password",
        termsAccepted: true,
      }),
      findById: vi.fn().mockResolvedValue(null),
      create: vi.fn(),
    };

    const refreshTokenRepository = {
      findByTokenHash: vi.fn().mockResolvedValue(null),
      create: vi.fn(),
      revokeByTokenHash: vi.fn(),
    };

    vi.spyOn(bcrypt, "compare").mockImplementation(async () => true);

    const authService = new AuthService(userRepository, refreshTokenRepository);

    const input = {
      email: "user@example.com",
      password: "password",
    };
    const result = await authService.login(input);

    expect(result).toEqual({
      accessToken: expect.any(String),
      refreshToken: expect.any(String),
      user: { id: "user-1", name: "John Doe", email: "user@example.com" },
    });
    expect(userRepository.findByEmail).toHaveBeenCalledWith("user@example.com");
    expect(bcrypt.compare).toHaveBeenCalledWith("password", "hashed-password");
    expect(refreshTokenRepository.create).toHaveBeenCalled();
    expect(userRepository.create).not.toHaveBeenCalled();
    expect(userRepository.findById).not.toHaveBeenCalled();
  });

  it("should logout user with valid refresh token", async () => {
    const userRepository = {
      findByEmail: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
    };

    const refreshTokenRepository = {
      findByTokenHash: vi.fn().mockResolvedValue({
        id: "token-1",
        userId: "user-1",
        tokenHash: "hashed-token",
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        revokedAt: null,
      }),
      create: vi.fn(),
      revokeByTokenHash: vi.fn(),
    };

    const authService = new AuthService(userRepository, refreshTokenRepository);
    const result = await authService.logout("valid-refresh-token");

    expect(result).toEqual({ success: true });
    expect(refreshTokenRepository.revokeByTokenHash).toHaveBeenCalled();
  });

  it("should throw error on logout with invalid refresh token", async () => {
    const userRepository = {
      findByEmail: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
    };

    const refreshTokenRepository = {
      findByTokenHash: vi.fn().mockResolvedValue(null),
      create: vi.fn(),
      revokeByTokenHash: vi.fn(),
    };

    const authService = new AuthService(userRepository, refreshTokenRepository);

    await expect(authService.logout("invalid-token")).rejects.toThrow(
      "Invalid or expired refresh token",
    );
  });

  it("should throw error on logout with expired refresh token", async () => {
    const userRepository = {
      findByEmail: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
    };

    const refreshTokenRepository = {
      findByTokenHash: vi.fn().mockResolvedValue({
        id: "token-1",
        userId: "user-1",
        tokenHash: "hashed-token",
        expiresAt: new Date(Date.now() - 1000),
        revokedAt: null,
      }),
      create: vi.fn(),
      revokeByTokenHash: vi.fn(),
    };

    const authService = new AuthService(userRepository, refreshTokenRepository);

    await expect(authService.logout("expired-token")).rejects.toThrow(
      "Invalid or expired refresh token",
    );
  });

  it("should refresh tokens with valid refresh token", async () => {
    const userRepository = {
      findByEmail: vi.fn(),
      findById: vi.fn().mockResolvedValue({
        id: "user-1",
        name: "John Doe",
        email: "user@example.com",
      }),
      create: vi.fn(),
    };

    const refreshTokenRepository = {
      findByTokenHash: vi.fn().mockResolvedValue({
        id: "token-1",
        userId: "user-1",
        tokenHash: "hashed-token",
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        revokedAt: null,
      }),
      create: vi.fn(),
      revokeByTokenHash: vi.fn(),
    };

    const authService = new AuthService(userRepository, refreshTokenRepository);
    const result = await authService.refresh("valid-refresh-token");

    expect(result).toEqual({
      accessToken: expect.any(String),
      refreshToken: expect.any(String),
    });
    expect(refreshTokenRepository.revokeByTokenHash).toHaveBeenCalled();
    expect(refreshTokenRepository.create).toHaveBeenCalled();
    expect(userRepository.findById).toHaveBeenCalledWith("user-1");
  });

  it("should throw error on refresh with invalid refresh token", async () => {
    const userRepository = {
      findByEmail: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
    };

    const refreshTokenRepository = {
      findByTokenHash: vi.fn().mockResolvedValue(null),
      create: vi.fn(),
      revokeByTokenHash: vi.fn(),
    };

    const authService = new AuthService(userRepository, refreshTokenRepository);

    await expect(authService.refresh("invalid-token")).rejects.toThrow(
      "Invalid or expired refresh token",
    );
  });

  it("should throw error on refresh with expired refresh token", async () => {
    const userRepository = {
      findByEmail: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
    };

    const refreshTokenRepository = {
      findByTokenHash: vi.fn().mockResolvedValue({
        id: "token-1",
        userId: "user-1",
        tokenHash: "hashed-token",
        expiresAt: new Date(Date.now() - 1000),
        revokedAt: null,
      }),
      create: vi.fn(),
      revokeByTokenHash: vi.fn(),
    };

    const authService = new AuthService(userRepository, refreshTokenRepository);

    await expect(authService.refresh("expired-token")).rejects.toThrow(
      "Invalid or expired refresh token",
    );
  });

  it("should return user info with valid userId", async () => {
    const userRepository = {
      findByEmail: vi.fn(),
      findById: vi.fn().mockResolvedValue({
        id: "user-1",
        name: "John Doe",
        email: "user@example.com",
      }),
      create: vi.fn(),
    };

    const refreshTokenRepository = {
      findByTokenHash: vi.fn(),
      create: vi.fn(),
      revokeByTokenHash: vi.fn(),
    };

    const authService = new AuthService(userRepository, refreshTokenRepository);
    const result = await authService.me("user-1");

    expect(result).toEqual({
      user: { id: "user-1", name: "John Doe", email: "user@example.com" },
    });
    expect(userRepository.findById).toHaveBeenCalledWith("user-1");
  });

  it("should throw error on me with invalid userId", async () => {
    const userRepository = {
      findByEmail: vi.fn(),
      findById: vi.fn().mockResolvedValue(null),
      create: vi.fn(),
    };

    const refreshTokenRepository = {
      findByTokenHash: vi.fn(),
      create: vi.fn(),
      revokeByTokenHash: vi.fn(),
    };

    const authService = new AuthService(userRepository, refreshTokenRepository);

    await expect(authService.me("invalid-user-id")).rejects.toThrow(
      "User not found",
    );
  });
});
