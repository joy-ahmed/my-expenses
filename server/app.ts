import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from 'hono/bun'
import { expensesRoute } from "./routes/expenses";

const app = new Hono();

app.use('*', logger());

app.get('*', serveStatic({ root: './frontend/dist' }))
// app.get('*', serveStatic({ path: './frontend/dist/index.html' }))


app.route("/api/expenses", expensesRoute);

export default app;