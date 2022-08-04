import { app } from "./app";

const HTTP_PORT = process.env.HTTP_PORT || 3000;

app.listen(HTTP_PORT, () =>
  console.log(`🔥 Server started at http://localhost:${HTTP_PORT}`)
);
