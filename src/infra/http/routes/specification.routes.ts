import { Router } from "express";

import { CreateSpecificationController } from "@application/controllers/specification/create";
import { ListSpecificationsController } from "@application/controllers/specification/list";

import { isAdmin } from "@infra/http/middlewares/is-admin";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationRoutes.get("/", listSpecificationsController.handle);

specificationRoutes.use(isAdmin);
specificationRoutes.post("/", createSpecificationController.handle);

export { specificationRoutes };
