import { log } from "console";
import fastify from "fastify";

const app = fastify();
const port = 3333;

app.get("/", async (req, res) => {
  return "Hello NLW Unite!";
});

app.get("/users", async (req, res) => {
  return "Hello teste!";
});
app.post("/users", async (req, res) => {
  return "Hello teste!";
});

app.listen({ port }).then(() => {
  log(`🚀 HTTP server  is listening on port ${port}!`);
});
