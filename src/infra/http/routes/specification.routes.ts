import { Router } from "express";

import { CreateSpecificationController } from "@application/controllers/specification/create-specificaiton";
import { ListSpecificationsController } from "@application/controllers/specification/list-specifications";

import { ensureAuthenticated } from "@infra/http/middlewares/ensure-authenticated";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationRoutes.use(ensureAuthenticated);
specificationRoutes.get("/", listSpecificationsController.handle);
specificationRoutes.post("/", createSpecificationController.handle);

export { specificationRoutes };
