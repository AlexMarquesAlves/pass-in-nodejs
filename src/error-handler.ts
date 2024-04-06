import { FastifyInstance } from "fastify";

import { ZodError } from "zod";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  return reply.status(500).send({ message: "Internal server error!" });
};
