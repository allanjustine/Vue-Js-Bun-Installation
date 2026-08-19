# Vue, Hono, and GraphQL App

A full-stack application with a Vue 3 frontend, a Hono API powered by Bun, GraphQL queries, and PostgreSQL access through Drizzle ORM.

## Stack

- **Client:** Vue 3, Vue Router, Vite, TypeScript
- **Server:** Bun, Hono, GraphQL
- **Database:** PostgreSQL with Drizzle ORM
- **HTTP client:** Axios

## Requirements

- [Bun](https://bun.sh/) 1.3 or later
- PostgreSQL
- A PostgreSQL connection string in `DATABASE_URL`

## Project Structure

```text
client/  Vue frontend
server/  Hono and GraphQL API
```

## Setup

1. Install the client dependencies:

   ```sh
   cd client
   bun install
   ```

2. Install the server dependencies:

   ```sh
   cd ../server
   bun install
   ```

3. Configure the database connection. Create `server/.env` with:

   ```env
   DATABASE_URL=postgres://USER:PASSWORD@localhost:5432/DATABASE_NAME
   ```

4. Ensure the PostgreSQL database contains the `users` table described by [`server/lib/db/schema.ts`](server/lib/db/schema.ts). Drizzle Kit is configured in [`server/drizzle.config.ts`](server/drizzle.config.ts), so migrations can be generated and applied with:

   ```sh
   cd server
   bunx drizzle-kit generate
   bunx drizzle-kit migrate
   ```

## Development

Start both the API and frontend from the `server` directory:

```sh
cd server
bun run dev
```

The services are available at:

- Frontend: http://localhost:3000
- API health page: http://localhost:3001/
- GraphQL endpoint: http://localhost:3001/graphql

The frontend currently provides these routes:

- `/users` - user list and user management view
- `/users/:id` - user detail view
- `/todos` - todo view placeholder

## GraphQL

The API accepts POST requests at `http://localhost:3001/graphql`.

Example query:

```graphql
query {
  users(limit: 20, offset: 0) {
    id
    name
    email
    createdAt
  }
}
```

Available queries are:

- `users(limit: Int, offset: Int)`
- `user(id: ID!)`

## Checks and Production Build

Client commands are run from `client`:

```sh
bun run type-check
bun run lint
bun run build
bun run preview
```

The server can be started directly with:

```sh
cd server
bun run dev:server
```

The client can be started directly with:

```sh
cd client
bun run dev
```
