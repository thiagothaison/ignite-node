import dataSource from "~/dataSource";

import { CategoryRepository } from "~/cars/repositories/Category";

import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

const categoryRepository = new CategoryRepository(dataSource);
const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
const createCategoryController = new CreateCategoryController(
  createCategoryUseCase
);

export { createCategoryController };
