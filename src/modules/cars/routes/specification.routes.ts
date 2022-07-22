import { Router } from "express";

import { CreateSpecificationController } from "~/cars/useCases/Specification/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "~/cars/useCases/Specification/listSpecifications/ListSpecificationsController";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationRoutes.get("/", listSpecificationsController.handle);
specificationRoutes.post("/", createSpecificationController.handle);

export { specificationRoutes };
