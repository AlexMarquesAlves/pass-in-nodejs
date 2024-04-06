import fastify from "fastify";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";

import {
  ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { checkIn } from "./routes/check-in";
import { createEvent } from "./routes/create-event";
import { getAttendeeBadge } from "./routes/get-attendee-badge";
import { getEvent } from "./routes/get-event";
import { getEventAttendees } from "./routes/get-event-attendees";
import { registerForEvent } from "./routes/register-for-event";

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description:
        "Especificações da API para o back-end da aplicação pass.in construída durante o NLW Unite da Rocketseat.",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUI, {
  routePrefix: "/docs",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);

const port = 3333;
app.listen({ port, host: "0.0.0.0" }).then(() => {
  console.log(`🚀 HTTP server  is listening on port ${port}!`);
});
