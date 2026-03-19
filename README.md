# ClientFlow Backend

API backend do projeto ClientFlow, construída com Node.js, TypeScript, Express e Prisma.

Backend API for the ClientFlow project, built with Node.js, TypeScript, Express, and Prisma.

## PT-BR

### Visão geral

Este backend está em desenvolvimento e atualmente possui:

- Estrutura base de API com Express
- Conexão com PostgreSQL via Prisma
- Modelos iniciais: `User` e `Client`
- Endpoint de saúde da aplicação

### Tecnologias

- Node.js
- TypeScript
- Express
- Prisma
- PostgreSQL

### Requisitos

- Node.js 18+
- Banco PostgreSQL disponível

### Configuração

1. Instale as dependências:

```bash
npm install
```

2. Crie o arquivo `.env` na raiz da pasta `backend`:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/clientflow"
PORT=3000
```

3. Aplique as migrations do Prisma:

```bash
npx prisma migrate dev
```

4. Inicie o servidor em modo desenvolvimento:

```bash
npm run dev
```

### Endpoint disponível

- `GET /health` -> retorna status da API

Exemplo de resposta:

```json
{
  "status": "ok"
}
```

### Estrutura (resumo)

- `src/app.ts`: configuração principal do app
- `src/infra/http/server.ts`: inicialização do servidor
- `src/infra/http/routes.ts`: rotas HTTP
- `prisma/schema.prisma`: modelos e schema do banco

### Scripts

- `npm run dev`: inicia servidor com `tsx watch`

---

## EN

### Overview

This backend is currently in development and includes:

- Base API structure with Express
- PostgreSQL connection through Prisma
- Initial models: `User` and `Client`
- Application health-check endpoint

### Tech stack

- Node.js
- TypeScript
- Express
- Prisma
- PostgreSQL

### Requirements

- Node.js 18+
- A running PostgreSQL database

### Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file at the `backend` root:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/clientflow"
PORT=3000
```

3. Apply Prisma migrations:

```bash
npx prisma migrate dev
```

4. Start the development server:

```bash
npm run dev
```

### Available endpoint

- `GET /health` -> returns API status

Example response:

```json
{
  "status": "ok"
}
```

### Structure (summary)

- `src/app.ts`: main app configuration
- `src/infra/http/server.ts`: server bootstrap
- `src/infra/http/routes.ts`: HTTP routes
- `prisma/schema.prisma`: database schema and models

### Scripts

- `npm run dev`: starts server with `tsx watch`
