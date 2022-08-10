import "@config/dotenv";
import "@infra/tsyringe/container";

import swaggerFile from "@swaggerFile";

import express from "express";
import "express-async-errors";
import SwaggerUi from "swagger-ui-express";

import { errorHandler } from "./middlewares/error-handler";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use("/docs", SwaggerUi.serve, SwaggerUi.setup(swaggerFile));

if (process.env.NODE_ENV !== "production") {
  app.use("/static", express.static("storage"));
}

app.use(router);

app.use(errorHandler);

export { app };
