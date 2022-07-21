import dataSource from "~/dataSource";

import { SpecificationRepository } from "~/cars/repositories/Specification";

import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

const specificationRepository = new SpecificationRepository(dataSource);
const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationRepository
);
const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase
);

export { createSpecificationController };
