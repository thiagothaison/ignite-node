import { Router } from "express";
import multer from "multer";

import { createCategoryController } from "~/cars/useCases/Category/createCategory";
import { importCategoryController } from "~/cars/useCases/Category/importCategory";
import { listCategoriesController } from "~/cars/useCases/Category/listCategories";

const categoryRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

categoryRoutes.get("/", (request, response) => {
  return listCategoriesController.handle(request, response);
});

categoryRoutes.post("/", (request, response) => {
  return createCategoryController.handle(request, response);
});

categoryRoutes.post("/import", upload.single("file"), (request, response) => {
  return importCategoryController.handle(request, response);
});

export { categoryRoutes };
