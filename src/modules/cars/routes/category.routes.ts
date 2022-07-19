import { Router } from "express";

import { createCategoryController } from "~/cars/useCases/Category/createCategory";
import { listCategoriesController } from "~/cars/useCases/Category/listCategories";

const categoryRoutes = Router();

categoryRoutes.get("/", (request, response) => {
  return listCategoriesController.handle(request, response);
});

categoryRoutes.post("/", (request, response) => {
  return createCategoryController.handle(request, response);
});

export { categoryRoutes };
