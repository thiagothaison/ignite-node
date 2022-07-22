import dataSource from "~/dataSource";

import { container } from "tsyringe";
import { DataSource } from "typeorm";

import { CategoryRepository } from "~/cars/repositories/Category";
import { ICategoryRepository } from "~/cars/types/repositories/Category";

container.registerInstance<DataSource>("DataSource", dataSource);

container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);
