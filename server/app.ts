import { Hono } from "hono";
import { cors } from "hono/cors";
import { schema } from "./lib/schema";
import { root } from "./lib/resolvers";
import { graphql } from "graphql";

const app = new Hono();
const PORT = 3001;

app.use("/graphql", cors({ origin: "*" }));

app.post("/graphql", async (c) => {
  const { query, variables } = await c.req.json();

  const result = await graphql({
    schema,
    source: query,
    rootValue: root,
    variableValues: variables,
  });

  return c.json(result);
});

app.get("/", (c) => c.text("Hello Bun + Hono + GraphQL! run /graphql"));

const server = Bun.serve({
  port: PORT,
  fetch: app.fetch,
});

console.log(`✅ Server running at http://localhost:${server.port}`);
