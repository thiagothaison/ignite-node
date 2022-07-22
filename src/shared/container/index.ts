import dataSource from "~/dataSource";

import { container } from "tsyringe";
import { DataSource } from "typeorm";

import { CategoryRepository } from "~/cars/repositories/Category";
import { SpecificationRepository } from "~/cars/repositories/Specification";
import { ICategoryRepository } from "~/cars/types/repositories/Category";
import { ISpecificationRepository } from "~/cars/types/repositories/Specification";

container.registerInstance<DataSource>("DataSource", dataSource);

container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);
