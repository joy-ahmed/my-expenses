import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3, "title must be at least 3 characters"),
  amount: z.number().int().positive("amount must be positive"),
});

type Expense = z.infer<typeof expenseSchema>;

const createExpenseSchema = expenseSchema.omit({ id: true });

const fakeData: Expense[] = [
  {
    id: 1,
    title: "Expense 1",
    amount: 10,
  },
  {
    id: 2,
    title: "Expense 2",
    amount: 20,
  },
  {
    id: 3,
    title: "Expense 3",
    amount: 30,
  },
];

export const expensesRoute = new Hono()
  .get("/", async (c) => {
    return c.json({ message: "get expenses", data: fakeData });
  })
  .post("/", zValidator("json", createExpenseSchema), async (c) => {
    const data = await c.req.valid("json");
    const expense = createExpenseSchema.parse(data);
    fakeData.push({ ...expense, id: fakeData.length });
    console.log(expense);
    c.status(201);
    return c.json(expense);
  })
  .get("/:id{[0-9]+}", async (c) => {
    const id = Number(c.req.param("id"));
    const expense = fakeData.find((e) => e.id === id);
    if (!expense) {
      return c.notFound();
    }
    return c.json({ message: "get expense", total: expense });
  })
  .get("/total-spent", async (c) => {
    const total = fakeData.reduce((acc, e) => acc + e.amount, 0);
    return c.json({ message: "total spent", total: total });
  })
  .delete("/:id{[0-9]+}", async (c) => {
    const id = Number(c.req.param("id"));
    const index = fakeData.findIndex((e) => e.id === id);
    if (index === -1) {
      return c.notFound();
    }
    fakeData.splice(index, 1);
    return c.json({ message: "deleted" });
  });
