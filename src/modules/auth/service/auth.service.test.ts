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
      }),
    };

    vi.spyOn(bcrypt, "hash").mockImplementation(async () => "hashed-password");

    const authService = new AuthService(userRepository);

    const input = {
      name: "John Doe",
      email: "user@example.com",
      password: "password",
    };

    const result = await authService.register(input);

    expect(result).toEqual({
      id: "user-1",
      name: "John Doe",
      email: "user@example.com",
    });

    expect(userRepository.findByEmail).toHaveBeenCalledWith("user@example.com");
    expect(userRepository.findById).not.toHaveBeenCalled();

    expect(userRepository.create).toHaveBeenCalledWith({
      name: "John Doe",
      email: "user@example.com",
      password: "hashed-password",
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
      }),
      findById: vi.fn().mockResolvedValue(null),
      create: vi.fn(),
    };

    vi.spyOn(bcrypt, "compare").mockImplementation(async () => true);

    const authService = new AuthService(userRepository);

    const input = {
      email: "user@example.com",
      password: "password",
    };
    const result = await authService.login(input);

    expect(result).toEqual({
      token: expect.any(String),
      user: { id: "user-1", name: "John Doe", email: "user@example.com" },
    });
    expect(userRepository.findByEmail).toHaveBeenCalledWith("user@example.com");
    expect(bcrypt.compare).toHaveBeenCalledWith("password", "hashed-password");
    expect(userRepository.create).not.toHaveBeenCalled();
    expect(userRepository.findById).not.toHaveBeenCalled();
  });
});
