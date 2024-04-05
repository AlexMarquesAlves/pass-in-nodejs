import "dotenv/config";
import fastify from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const app = fastify();
const port = process.env.PORT || 3333;
const prisma = new PrismaClient({
  log: ["query"],
});

app.post("/events", async (req, res) => {
  const createEventSchema = z.object({
    title: z.string().min(4),
    details: z.string().nullable(),
    maximumAttendees: z.number().int().positive().nullable(),
  });

  const data = createEventSchema.parse(req.body);

  prisma.event.create({
    data: {
      title: data.title,
      details: data.details,
      slug: new Date().toISOString(),
    },
  });

  return "Hello NLW Unite!";
});

app.listen({ port }).then(() => {
  console.log(`🚀 HTTP server  is listening on port ${port}!`);
});
