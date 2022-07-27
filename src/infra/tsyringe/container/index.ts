import { container } from "tsyringe";
import { DataSource } from "typeorm";

import { ICategoryRepository } from "@domain/contracts/repositories/category";
import { ISpecificationRepository } from "@domain/contracts/repositories/specification";
import { IUserRepository } from "@domain/contracts/repositories/user";

import dataSource from "@infra/typeorm";
import { CategoryRepository } from "@infra/typeorm/repositories/category";
import { SpecificationRepository } from "@infra/typeorm/repositories/specification";
import { UserRepository } from "@infra/typeorm/repositories/user";

container.registerInstance<DataSource>("DataSource", dataSource);

container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
