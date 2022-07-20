import express from "express";
import SwaggerUi from "swagger-ui-express";

import swaggerFile from "~/root/swagger.json";

import { router } from "./routes";

const app = express();

app.use(express.json());

app.use("/docs", SwaggerUi.serve, SwaggerUi.setup(swaggerFile));

app.use(router);

app.listen(3333, () => console.log("Server is running 🔥"));
