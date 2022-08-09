import { Router } from "express";
import multer from "multer";

import { UploadConfiguration } from "@config/upload";

import { CreateCategoryController } from "@application/controllers/category/create";
import { ImportCategoryController } from "@application/controllers/category/import";
import { ListCategoriesController } from "@application/controllers/category/list";

import { isAdmin } from "@infra/http/middlewares/is-admin";
import { LocalStorageProvider } from "@infra/providers/storage/local";

const localStorage = new LocalStorageProvider();
const uploadConfiguration = new UploadConfiguration(localStorage);

const upload = multer(uploadConfiguration.getConfig("tmp"));

const categoryRoutes = Router();

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoryRoutes.get("/", listCategoriesController.handle);

categoryRoutes.use(isAdmin);
categoryRoutes.post("/", createCategoryController.handle);
categoryRoutes.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);

export { categoryRoutes };
