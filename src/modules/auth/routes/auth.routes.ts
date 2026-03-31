import {Router} from "express";
import { UserRepository } from "../../user/repository/user.repository";
import { AuthController } from "../controller/auth.controller";
import { AuthService } from "../service/auth.service";
import { AuthMiddleware } from "../middleware/auth.middleware";

const authRoutes = Router();
const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);
const authMiddleware = new AuthMiddleware();

authRoutes.post("/register", authController.register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticates a user and returns a JWT token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 1234567890
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     success:
 *                       type: boolean
 *                       example: true
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid credentials
 */

authRoutes.post("/login", authController.login);
authRoutes.get("/me", authMiddleware.authenticate, authController.me);

export { authRoutes };