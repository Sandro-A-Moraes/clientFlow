# ClientFlow Backend

API do ClientFlow desenvolvida com Node.js, TypeScript, Express e Prisma.

## Visao Geral

Este servico expoe endpoints para:

- autenticacao com JWT
- gestao de clientes por usuario autenticado
- gestao de agendamentos vinculados aos clientes
- documentacao OpenAPI (Swagger)

## Ambientes

- Local: http://localhost:3000
- Producao: https://clientflow-backend-0gpa.onrender.com/

Documentacao Swagger:

- Local: http://localhost:3000/docs
- Producao: https://clientflow-backend-0gpa.onrender.com/docs

## Stack

- Node.js
- TypeScript
- Express
- Prisma
- PostgreSQL
- JWT (`jsonwebtoken`)
- `bcrypt`

## Requisitos

- Node.js 18+
- NPM 9+
- Banco PostgreSQL acessivel pela `DATABASE_URL`

## Configuracao Local

1. Instale as dependencias:

```bash
npm install
```

2. Crie o arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/clientflow"
JWT_SECRET="uma-chave-forte"
PORT=3000
```

3. Rode as migrations:

```bash
npx prisma migrate dev
```

4. (Opcional) Abra o Prisma Studio:

```bash
npx prisma studio
```

5. Suba a aplicacao em modo desenvolvimento:

```bash
npm run dev
```

## Scripts

- `npm run dev`: inicia com recarga automatica via `tsx watch`
- `npm run build`: compila TypeScript para `dist/`
- `npm run start`: executa build compilada (`node dist/infra/http/server.js`)
- `npm run test`: executa testes com Vitest
- `npm run test:watch`: executa testes em watch mode

## Fluxo de Build e Execucao

Para validar ambiente de producao localmente:

```bash
npm run build
npm run start
```

## Autenticacao

Rotas protegidas exigem o header:

```http
Authorization: Bearer <token>
```

### Exemplo de login

`POST /auth/login`

```json
{
  "email": "maria@email.com",
  "password": "123456"
}
```

Resposta:

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

## Endpoints Principais

### Health

- `GET /health`

### Auth

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me` (protegida)

### Clients

- `POST /clients` (protegida)
- `GET /clients` (protegida)
- `GET /clients/:id` (protegida)
- `GET /clients?search=nome` (protegida)

Exemplo de payload (`POST /clients`):

```json
{
  "name": "Empresa XPTO",
  "email": "contato@xpto.com",
  "phone": "11999999999",
  "notes": "Cliente preferencial"
}
```

### Appointments

- `POST /appointments` (protegida)
- `GET /appointments?clientId=<id>` (protegida)

Exemplo de payload (`POST /appointments`):

```json
{
  "clientId": "uuid-do-client",
  "description": "Reuniao de alinhamento",
  "scheduledAt": "2026-04-05T14:00:00.000Z",
  "status": "pending",
  "notes": "Preferencia por chamada de video"
}
```

## Estrutura do Projeto

- `src/infra/http/server.ts`: bootstrap do servidor HTTP
- `src/infra/http/routes.ts`: rotas agregadas da aplicacao
- `src/modules/auth`: autenticacao, middleware e servico de usuario autenticado
- `src/modules/clients`: regras de negocio e persistencia de clientes
- `src/modules/appointments`: regras de negocio e persistencia de agendamentos
- `src/lib/prisma.ts`: instancia do cliente Prisma
- `prisma/schema.prisma`: schema do banco (User, Client e Appointment)

## Observacoes

- O projeto usa ESM com TypeScript (`NodeNext`), entao imports relativos internos usam extensao `.js`.
- Se houver erro de conexao com banco, valide `DATABASE_URL` e status do PostgreSQL.
