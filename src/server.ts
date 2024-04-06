import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

const port = 3333;
app.listen({ port }).then(() => {
  console.log(`🚀 HTTP server  is listening on port ${port}!`);
});
