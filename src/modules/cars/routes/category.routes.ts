import UploadConfig from "~/config/upload";

import { Router } from "express";
import multer from "multer";

import { ensureAuthenticated } from "~/middlewares/ensureAuthenticated";

import { CreateCategoryController } from "~/cars/useCases/Category/createCategory/CreateCategoryController";
import { ImportCategoryController } from "~/cars/useCases/Category/importCategory/ImportCategoryController";
import { ListCategoriesController } from "~/cars/useCases/Category/listCategories/ListCategoriesController";

const categoryRoutes = Router();

const upload = multer(UploadConfig.upload("tmp"));

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoryRoutes.use(ensureAuthenticated);
categoryRoutes.get("/", listCategoriesController.handle);
categoryRoutes.post("/", createCategoryController.handle);
categoryRoutes.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);

export { categoryRoutes };
