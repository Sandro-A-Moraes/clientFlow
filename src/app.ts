import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./infra/http/routes.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.js";
import { errorHandler } from "./infra/http/middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import { globalRateLimit } from "./infra/http/middleware/security/global-rate-limit.js";

dotenv.config();

const app = express();

app.set("trust proxy", 1);
app.use(globalRateLimit);

app.use(cors(
  {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  }
));

app.use(cookieParser());
app.use(express.json());
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customSiteTitle: "ClientFlow API Docs",
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: "none",
      filter: true,
      tagsSorter: "alpha",
      operationsSorter: "alpha",
    },
  }),
);
app.use(router);

app.use(errorHandler);

export default app;
