import { Router } from "express";

import { ensureAuthenticated } from "~/middlewares/ensureAuthenticated";

import { CreateSpecificationController } from "~/cars/useCases/Specification/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "~/cars/useCases/Specification/listSpecifications/ListSpecificationsController";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationRoutes.use(ensureAuthenticated);
specificationRoutes.get("/", listSpecificationsController.handle);
specificationRoutes.post("/", createSpecificationController.handle);

export { specificationRoutes };
