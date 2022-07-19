import { Router } from "express";

import { createSpecificationController } from "~/cars/useCases/Specification/createSpecification";
import { listSpecificationsController } from "~/cars/useCases/Specification/listSpecifications";

const specificationRoutes = Router();

specificationRoutes.get("/", (request, response) => {
  return listSpecificationsController.handle(request, response);
});

specificationRoutes.post("/", (request, response) => {
  return createSpecificationController.handle(request, response);
});

export { specificationRoutes };
