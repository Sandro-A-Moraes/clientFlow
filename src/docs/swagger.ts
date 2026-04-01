import swaggerJsdoc, { type Options} from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ClientFlow API",
      version: "1.0.0",
      description: "API documentation for ClientFlow",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [
          
        ],
      },
    ],
  },
  apis: ["./src/modules/**/*.ts", "./src/infra/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);