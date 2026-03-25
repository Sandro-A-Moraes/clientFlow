# ClientFlow Backend

API backend do projeto ClientFlow, construída com Node.js, TypeScript, Express, Prisma e PostgreSQL.

Backend API for the ClientFlow project, built with Node.js, TypeScript, Express, Prisma, and PostgreSQL.

## PT-BR

### Visão geral

O backend já possui autenticação JWT e gerenciamento básico de clientes.

Funcionalidades atuais:

- Cadastro e login de usuário
- Rota protegida para dados do usuário autenticado
- Cadastro e listagem de clientes por usuário
- Busca de cliente por ID
- Filtro de clientes por nome (`search`)
- Health check da API

### Stack

- Node.js
- TypeScript
- Express
- Prisma
- PostgreSQL
- JWT (`jsonwebtoken`)
- `bcrypt` para hash de senha

### Requisitos

- Node.js 18+
- Banco PostgreSQL disponível

### Configuração

1. Entre na pasta do backend:

```bash
cd backend
```

2. Instale as dependências:

```bash
npm install
```

3. Crie o arquivo `.env` na raiz de `backend`:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/clientflow"
JWT_SECRET="sua-chave-secreta"
PORT=3000
```

4. Aplique as migrations:

```bash
npx prisma migrate dev
```

5. Suba o servidor em desenvolvimento:

```bash
npm run dev
```

Servidor padrão: `http://localhost:3000`

### Autenticação

As rotas protegidas usam header:

```http
Authorization: Bearer <token>
```

### Endpoints

#### Health

- `GET /health`

#### Auth

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me` (protegida)

Exemplo de body para cadastro/login:

```json
{
  "name": "Maria",
  "email": "maria@email.com",
  "password": "123456"
}
```

Resposta de login:

```json
{
  "token": "jwt_token",
  "user": {
    "id": "uuid",
    "name": "Maria",
    "email": "maria@email.com"
  },
  "success": true
}
```

#### Clients

- `POST /clients` (protegida)
- `GET /clients` (protegida)
- `GET /clients/:id` (protegida)
- `GET /clients?search=nome` (protegida)

Exemplo de body para criar cliente:

```json
{
  "name": "Empresa XPTO",
  "email": "contato@xpto.com",
  "phone": "11999999999",
  "observations": "Cliente preferencial"
}
```

### Scripts

- `npm run dev`: inicia com `tsx watch`
- `npm test`: placeholder (ainda não configurado)

### Estrutura resumida

- `src/infra/http/routes.ts`: rotas principais (`/auth`, `/clients`, `/health`)
- `src/modules/auth`: autenticação, middleware e token JWT
- `src/modules/clients`: regras e acesso de dados de clientes
- `src/lib/prisma.ts`: cliente Prisma com adapter PostgreSQL
- `prisma/schema.prisma`: modelos `User` e `Client`

---

## EN

### Overview

The backend now includes JWT authentication and basic client management.

Current features:

- User registration and login
- Protected route for authenticated user data
- Client creation and listing per user
- Get client by ID
- Client filtering by name (`search`)
- API health check

### Stack

- Node.js
- TypeScript
- Express
- Prisma
- PostgreSQL
- JWT (`jsonwebtoken`)
- `bcrypt` for password hashing

### Requirements

- Node.js 18+
- A running PostgreSQL database

### Setup

1. Move to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create the `.env` file at `backend` root:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/clientflow"
JWT_SECRET="your-secret-key"
PORT=3000
```

4. Run migrations:

```bash
npx prisma migrate dev
```

5. Start dev server:

```bash
npm run dev
```

Default server: `http://localhost:3000`

### Authentication

Protected routes require this header:

```http
Authorization: Bearer <token>
```

### Endpoints

#### Health

- `GET /health`

#### Auth

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me` (protected)

Sample register/login payload:

```json
{
  "name": "Mary",
  "email": "mary@email.com",
  "password": "123456"
}
```

Login response:

```json
{
  "token": "jwt_token",
  "user": {
    "id": "uuid",
    "name": "Mary",
    "email": "mary@email.com"
  },
  "success": true
}
```

#### Clients

- `POST /clients` (protected)
- `GET /clients` (protected)
- `GET /clients/:id` (protected)
- `GET /clients?search=name` (protected)

Sample create client payload:

```json
{
  "name": "ACME",
  "email": "contact@acme.com",
  "phone": "11999999999",
  "observations": "Priority customer"
}
```

### Scripts

- `npm run dev`: starts server with `tsx watch`
- `npm test`: placeholder (not configured yet)

### Structure summary

- `src/infra/http/routes.ts`: main routes (`/auth`, `/clients`, `/health`)
- `src/modules/auth`: authentication, middleware, and JWT token flow
- `src/modules/clients`: client business rules and data access
- `src/lib/prisma.ts`: Prisma client with PostgreSQL adapter
- `prisma/schema.prisma`: `User` and `Client` models
