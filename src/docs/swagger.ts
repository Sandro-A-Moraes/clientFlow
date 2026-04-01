import swaggerJsdoc, { type Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "ClientFlow API",
      version: "1.0.0",
      description: `
        API para gerenciamento de clientes, autenticação de usuários e agendamentos.

        ## Recursos principais
        - Autenticação com JWT
        - Cadastro e consulta de clientes
        - Gerenciamento de agendamentos

        ## Autenticação
        As rotas protegidas exigem um token JWT no header:

        \`Authorization: Bearer <token>\`
      `,
      contact: {
        name: "Equipe ClientFlow",
        email: "suporte@clientflow.com",
      },
      license: {
        name: "MIT",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Ambiente de desenvolvimento",
      },
      {
        url: "https://api.clientflow.com",
        description: "Ambiente de produção",
      },
    ],
    tags: [
      {
        name: "Health",
        description: "Verificação de saúde da API",
      },
      {
        name: "Auth",
        description: "Endpoints de autenticação e sessão do usuário",
      },
      {
        name: "Clients",
        description: "Gerenciamento de clientes",
      },
      {
        name: "Appointments",
        description: "Gerenciamento de agendamentos",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Informe o token JWT no formato: Bearer <token>",
        },
      },
      schemas: {
        ErrorResponse: {
          type: "object",
          required: ["message"],
          properties: {
            message: {
              type: "string",
              example: "An unexpected error occurred",
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
          },
        },

        ClientListResponse: {
          type: "object",
          properties: {
            clients: {
              type: "array",
              items: {
                $ref: "#/components/schemas/ClientResponse",
              },
            },
          },
        },
      },
      responses: {
        BadRequest: {
          description: "Requisição inválida",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        Unauthorized: {
          description: "Usuário não autenticado",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        NotFound: {
          description: "Recurso não encontrado",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        Conflict: {
          description: "Conflito de dados",
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
