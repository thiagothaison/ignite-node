import { Router } from "express";

import { CreateSpecificationController } from "@application/controllers/specification/create-specificaiton";
import { ListSpecificationsController } from "@application/controllers/specification/list-specifications";

import { jwtAuth } from "@infra/http/middlewares/jwt.auth";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationRoutes.use(jwtAuth);
specificationRoutes.get("/", listSpecificationsController.handle);
specificationRoutes.post("/", createSpecificationController.handle);

export { specificationRoutes };
