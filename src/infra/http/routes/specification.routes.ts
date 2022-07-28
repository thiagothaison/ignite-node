import { Router } from "express";

import { CreateSpecificationController } from "@application/controllers/specification/create-specificaiton";
import { ListSpecificationsController } from "@application/controllers/specification/list-specifications";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationRoutes.get("/", listSpecificationsController.handle);
specificationRoutes.post("/", createSpecificationController.handle);

export { specificationRoutes };
