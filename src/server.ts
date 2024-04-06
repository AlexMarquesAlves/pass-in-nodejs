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
app.listen({ port }).then(() => {
  console.log(`🚀 HTTP server  is listening on port ${port}!`);
});
