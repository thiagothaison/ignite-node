import "~/config/dotenv";

import express from "express";
import SwaggerUi from "swagger-ui-express";

import swaggerFile from "~/root/swagger.json";

import "./database";

import { router } from "./routes";

const HTTP_PORT = process.env.HTTP_PORT || 3000;

const app = express();

app.use(express.json());

app.use("/docs", SwaggerUi.serve, SwaggerUi.setup(swaggerFile));

app.use(router);

app.listen(HTTP_PORT, () =>
  console.log(`🔥 Server started at http://localhost:${HTTP_PORT}`)
);
