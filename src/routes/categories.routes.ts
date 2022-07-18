import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";
import { CreateCategoryService } from "../services/CreateCategoryService";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.get("/", (request, response) => {
  const categories = categoriesRepository.list();

  return response.json(categories);
});

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);

  try {
    createCategoryService.execute({ name, description });

    return response.status(201).send();
  } catch (error) {
    return response.status(409).json({
      message: error.message,
    });
  }
});

export { categoriesRoutes };
