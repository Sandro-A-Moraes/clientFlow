import swaggerJsdoc, { type Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "ClientFlow API",
      version: "1.0.0",
      description:
        "API for authentication, client management, and appointments. Protected routes require a JWT token in the Authorization header: Bearer <token>.",
      contact: {
        name: "ClientFlow Team",
        email: "support@clientflow.com",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development",
      },
      {
        url: "https://clientflow-backend-0gpa.onrender.com/",
        description: "Production",
      },
    ],
    tags: [
      {
        name: "Health",
        description: "API health check",
      },
      {
        name: "Auth",
        description: "Authentication and user session endpoints",
      },
      {
        name: "Clients",
        description: "Client management",
      },
      {
        name: "Appointments",
        description: "Appointment management",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Provide JWT token using: Bearer <token>",
        },
      },
      schemas: {
        ErrorResponse: {
          type: "object",
          required: ["message"],
          properties: {
            message: {
              type: "string",
              example: "Invalid credentials",
            },
          },
        },

        SuccessResponse: {
          type: "object",
          required: ["success"],
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
          },
        },

        User: {
          type: "object",
          required: ["id", "name", "email"],
          properties: {
            id: {
              type: "string",
              example: "clx123abc456",
            },
            name: {
              type: "string",
              example: "John Doe",
            },
            email: {
              type: "string",
              format: "email",
              example: "john.doe@example.com",
            },
          },
        },

        RegisterInput: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: {
              type: "string",
              example: "John Doe",
            },
            email: {
              type: "string",
              format: "email",
              example: "john.doe@example.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "password123",
            },
          },
        },

        LoginInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "john.doe@example.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "password123",
            },
          },
        },

        AuthResponse: {
          type: "object",
          required: ["token", "user", "success"],
          properties: {
            token: {
              type: "string",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
            user: {
              $ref: "#/components/schemas/User",
            },
            success: {
              type: "boolean",
              example: true,
            },
          },
        },

        RegisterResponse: {
          type: "object",
          required: ["user", "success"],
          properties: {
            user: {
              $ref: "#/components/schemas/User",
            },
            success: {
              type: "boolean",
              example: true,
            },
          },
        },

        ClientInput: {
          type: "object",
          required: ["name", "email", "phone"],
          properties: {
            name: {
              type: "string",
              example: "Maria Oliveira",
            },
            email: {
              type: "string",
              format: "email",
              example: "maria.oliveira@example.com",
            },
            phone: {
              type: "string",
              example: "+55 91 99999-9999",
            },
            notes: {
              type: "string",
              example: "Prefers morning appointments",
            },
          },
        },

        ClientResponse: {
          type: "object",
          required: ["id", "name", "email", "phone"],
          properties: {
            id: {
              type: "string",
              example: "clt_001",
            },
            name: {
              type: "string",
              example: "Maria Oliveira",
            },
            email: {
              type: "string",
              format: "email",
              example: "maria.oliveira@example.com",
            },
            phone: {
              type: "string",
              example: "+55 91 99999-9999",
            },
            notes: {
              type: "string",
              nullable: true,
              example: "Prefers morning appointments",
            },
            userId: {
              type: "string",
              example: "usr_001",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2026-03-30T10:00:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2026-03-30T10:00:00.000Z",
            },
          },
        },

        AppointmentInput: {
          type: "object",
          required: ["clientId", "description", "scheduledAt", "status"],
          properties: {
            clientId: {
              type: "string",
              example: "clt_001",
            },
            description: {
              type: "string",
              example: "Initial consultation",
            },
            scheduledAt: {
              type: "string",
              format: "date-time",
              example: "2026-04-05T14:00:00.000Z",
            },
            status: {
              type: "string",
              example: "pending",
            },
            notes: {
              type: "string",
              example: "Client requested remote meeting",
            },
          },
        },

        AppointmentResponse: {
          type: "object",
          required: [
            "id",
            "clientId",
            "description",
            "scheduledAt",
            "status",
            "createdAt",
            "updatedAt",
          ],
          properties: {
            id: {
              type: "string",
              example: "apt_001",
            },
            clientId: {
              type: "string",
              example: "clt_001",
            },
            description: {
              type: "string",
              example: "Initial consultation",
            },
            scheduledAt: {
              type: "string",
              format: "date-time",
              example: "2026-04-05T14:00:00.000Z",
            },
            status: {
              type: "string",
              example: "pending",
            },
            notes: {
              type: "string",
              nullable: true,
              example: "Client requested remote meeting",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2026-03-30T10:00:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2026-03-30T10:00:00.000Z",
            },
          },
        },

        MeResponse: {
          type: "object",
          required: ["user", "success"],
          properties: {
            user: {
              $ref: "#/components/schemas/User",
            },
            success: {
              type: "boolean",
              example: true,
            },
          },
        },
      },
      responses: {
        BadRequest: {
          description: "Bad request",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        Unauthorized: {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        NotFound: {
          description: "Resource not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        Conflict: {
          description: "Data conflict",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/modules/**/*.ts", "./src/infra/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
