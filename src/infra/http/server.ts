import "@application/config/dotenv";
import "@infra/tsyringe/container";

import swaggerFile from "@swaggerFile";

import express from "express";
import "express-async-errors";
import SwaggerUi from "swagger-ui-express";

import { errorHandler } from "./middlewares/error-handler";
import { router } from "./routes";

const HTTP_PORT = process.env.HTTP_PORT || 3000;

const app = express();

app.use(express.json());

app.use("/docs", SwaggerUi.serve, SwaggerUi.setup(swaggerFile));

app.use(router);

app.use(errorHandler);

app.listen(HTTP_PORT, () =>
  console.log(`🔥 Server started at http://localhost:${HTTP_PORT}`)
);
