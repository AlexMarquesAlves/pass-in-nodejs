import "dotenv/config";
import fastify from "fastify";

const app = fastify();
const port = process.env.PORT || 3333;

app.post("/events", async (req, res) => {
  console.log(req.body);

  return "Hello NLW Unite!";
});

app.listen({ port }).then(() => {
  console.log(`🚀 HTTP server  is listening on port ${port}!`);
});
