import { Router } from "express";
import { UserRepository } from "../../user/repository/user.repository.js";
import { AuthController } from "../controller/auth.controller.js";
import { AuthService } from "../service/auth.service.js";
import { AuthMiddleware } from "../middleware/auth.middleware.js";
import { RefreshTokenRepository } from "../repository/refreshToken.repository.js";

const authRoutes = Router();
const userRepository = new UserRepository();
const refreshTokenRepository = new RefreshTokenRepository();
const authService = new AuthService(userRepository, refreshTokenRepository);
const authController = new AuthController(authService);
const authMiddleware = new AuthMiddleware();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account.
 *     tags:
 *       - Auth
 *     security: []
 *     requestBody:
 *       required: true
 *       description: Required user data
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponse'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
authRoutes.post("/register", authController.register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Authenticate user
 *     description: Validates user credentials and returns a JWT token.
 *     tags:
 *       - Auth
 *     security: []
 *     requestBody:
 *       required: true
 *       description: User credentials
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
authRoutes.post("/login", authController.login);

authRoutes.post("/logout", authController.logout);

authRoutes.post("/refresh", authController.refresh);

/**
 * @openapi
 * /auth/me:
 *   get:
 *     summary: Get authenticated user
 *     description: Returns the current authenticated user.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MeResponse'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
authRoutes.get("/me", authMiddleware.authenticate, authController.me);

export { authRoutes };
