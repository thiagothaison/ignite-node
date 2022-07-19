import { Router } from "express";

import { SpecificationRepository } from "~/cars/repositories/Specification";
import { CreateSpecificationService } from "~/cars/services/Specification/CreateSpecificationService";

const specificationRoutes = Router();
const specificationRepository = new SpecificationRepository();

specificationRoutes.get("/", (request, response) => {
  const categories = specificationRepository.list();

  return response.json(categories);
});

specificationRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const createSpecificationService = new CreateSpecificationService(
    specificationRepository
  );

  createSpecificationService.execute({ name, description });

  return response.status(201).send();
});

export { specificationRoutes };
