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
import { authRateLimit } from "../../../infra/http/middleware/security/auth-rate-limit.js";

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
authRoutes.post("/login", authRateLimit, authController.login);

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Revokes the refresh token and logs out the user.
 *     tags:
 *       - Auth
 *     security: []
 *     requestBody:
 *       required: true
 *       description: Refresh token
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshTokenInput'
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LogoutResponse'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       400:
 *         $ref: '#/components/responses/BadRequest'

 */
authRoutes.post("/logout", authController.logout);

/**
 * @openapi
 * /auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     description: Generates a new access token using a valid refresh token.
 *     tags:
 *       - Auth
 *     security: []
 *     requestBody:
 *       required: true
 *       description: Refresh token
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshTokenInput'
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefreshResponse'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */

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
