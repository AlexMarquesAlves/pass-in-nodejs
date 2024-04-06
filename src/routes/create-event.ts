import { ZodTypeProvider } from "fastify-type-provider-zod";
import { generateSlug } from "../utils/generate-slug";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";

export function createEvent(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/events",
    {
      schema: {
        body: z.object({
          title: z.string().min(4),
          details: z.string().nullable(),
          maximumAttendees: z.number().int().positive().nullable(),
        }),
        response: {
          201: z.object({ eventId: z.string().uuid() }),
        },
      },
    },
    async (req, res) => {
      // const createEventSchema = z.object({
      //   title: z.string().min(4),
      //   details: z.string().nullable(),
      //   maximumAttendees: z.number().int().positive().nullable(),
      // });

      const { title, details, maximumAttendees } = req.body;
      const slug = generateSlug(title);
      const eventWithSameSlug = await Prisma.event.findUnique({
        where: { slug },
      });

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

      return res.status(201).send({ eventId: event.id });
    }
  );
}
