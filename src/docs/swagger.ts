import swaggerJsdoc from "swagger-jsdoc";

const options = {
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
  },
  apis: ["./src/modules/**/*.ts", "./src/infra/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);