import fastify from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { generateSlug } from "./utils/generate-slug";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

const port = 3333;
const prisma = new PrismaClient({
  log: ["query"],
});

app.withTypeProvider<ZodTypeProvider>().post("/events", async (req, res) => {
  const createEventSchema = z.object({
    title: z.string().min(4),
    details: z.string().nullable(),
    maximumAttendees: z.number().int().positive().nullable(),
  });

  const { title, details, maximumAttendees } = createEventSchema.parse(
    req.body
  );
  const slug = generateSlug(title);
  const eventWithSameSlug = await prisma.event.findUnique({ where: { slug } });

  if (eventWithSameSlug !== null) {
    throw new Error("An event with the same name already exists");
  }

  const event = await prisma.event.create({
    data: {
      title,
      details,
      maximumAttendees,
      slug,
    },
  });

  return res.status(201).send({ event: event.id });
});

app.listen({ port }).then(() => {
  console.log(`🚀 HTTP server  is listening on port ${port}!`);
});
