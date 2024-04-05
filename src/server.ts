import fastify from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { generateSlug } from "./utils/generate-slug";

const app = fastify();
const port = 3333;
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
  const slug = generateSlug(data.title);
  const eventWithSameSlug = await prisma.event.findUnique({ where: { slug } });

  const event = await prisma.event.create({
    data: {
      title: data.title,
      details: data.details,
      maximumAttendees: data.maximumAttendees,
      slug,
    },
  });

  return res.status(201).send({ event: event.id });
});

app.listen({ port }).then(() => {
  console.log(`🚀 HTTP server  is listening on port ${port}!`);
});
