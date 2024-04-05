import "dotenv/config";
import fastify from "fastify";
import { z } from "zod";

const app = fastify();
const port = process.env.PORT || 3333;

app.post("/events", async (req, res) => {
  const createEventSchema = z.object({
    title: z.string().min(4),
    details: z.string().nullable(),
    maximumAttendees: z.number().int().positive().nullable(),
  });

  return "Hello NLW Unite!";
});

app.listen({ port }).then(() => {
  console.log(`🚀 HTTP server  is listening on port ${port}!`);
});
