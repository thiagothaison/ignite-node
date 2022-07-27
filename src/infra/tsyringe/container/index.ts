import { container } from "tsyringe";
import { DataSource } from "typeorm";

import { ICarRepository } from "@domain/contracts/repositories/car";
import { ICategoryRepository } from "@domain/contracts/repositories/category";
import { ISpecificationRepository } from "@domain/contracts/repositories/specification";
import { IUserRepository } from "@domain/contracts/repositories/user";

import dataSource from "@infra/typeorm";
import { CarRepository } from "@infra/typeorm/repositories/car";
import { CategoryRepository } from "@infra/typeorm/repositories/category";
import { SpecificationRepository } from "@infra/typeorm/repositories/specification";
import { UserRepository } from "@infra/typeorm/repositories/user";

container.registerInstance<DataSource>("DataSource", dataSource);
container.registerSingleton<ICarRepository>("CarRepository", CarRepository);
container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);
container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);
container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
