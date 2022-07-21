import dataSource from "~/dataSource";

import { CategoryRepository } from "~/cars/repositories/Category";

import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const categoryRepository = new CategoryRepository(dataSource);
const importCategoryUseCase = new ImportCategoryUseCase(categoryRepository);
const importCategoryController = new ImportCategoryController(
  importCategoryUseCase
);

export { importCategoryController };
