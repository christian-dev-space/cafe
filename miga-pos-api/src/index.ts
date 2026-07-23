import { fromHono } from "chanfana";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { TaskCreate } from "./endpoints/taskCreate";
import { TaskDelete } from "./endpoints/taskDelete";
import { TaskFetch } from "./endpoints/taskFetch";
import { TaskList } from "./endpoints/taskList";

// Start a Hono app
const app = new Hono<{ Bindings: Env }>();

app.use(
  "*",
  cors({
    origin: "http://localhost:5173",
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  })
);

// --------------------
// Storage API
// --------------------

app.get("/storage/:key", async (c) => {
  const key = c.req.param("key");

  const result = await c.env.miga_pos_db
    .prepare("SELECT value FROM storage WHERE key = ?")
    .bind(key)
    .first();

  if (!result) {
    return c.json(null);
  }

  return c.json(JSON.parse(result.value as string));
});

app.post("/storage", async (c) => {
  const { key, value } = await c.req.json();

  await c.env.miga_pos_db
    .prepare(`
      INSERT INTO storage (key, value)
      VALUES (?, ?)
      ON CONFLICT(key)
      DO UPDATE SET
        value = excluded.value,
        updated_at = CURRENT_TIMESTAMP
    `)
    .bind(key, JSON.stringify(value))
    .run();

  return c.json({
    success: true,
  });
});

// --------------------
// OpenAPI
// --------------------

const openapi = fromHono(app, {
  docs_url: "/",
});

openapi.get("/api/tasks", TaskList);
openapi.post("/api/tasks", TaskCreate);
openapi.get("/api/tasks/:taskSlug", TaskFetch);
openapi.delete("/api/tasks/:taskSlug", TaskDelete);

// Export app
export default app;