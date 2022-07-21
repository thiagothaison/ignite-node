import dataSource from "~/dataSource";

import { CategoryRepository } from "~/cars/repositories/Category";

import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

const categoryRepository = new CategoryRepository(dataSource);
const listCategoriesUseCase = new ListCategoriesUseCase(categoryRepository);
const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase
);

export { listCategoriesController };
