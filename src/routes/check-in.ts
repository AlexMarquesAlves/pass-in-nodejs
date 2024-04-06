import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

function checkIn(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get("/attendees/:attendeeId/check-in", (response, reply) => {});
}
