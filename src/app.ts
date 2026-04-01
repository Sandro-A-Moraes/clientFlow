import dotenv from 'dotenv';
import express from 'express'
import cors from 'cors';
import router from './infra/http/routes';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";

dotenv.config();

const app = express();

app.use(cors());
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

export default app;