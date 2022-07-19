import { Router } from "express";

import { CategoryRepository } from "~/cars/repositories/Category";
import { CreateCategoryService } from "~/cars/services/Category/CreateCategoryService";

const categoryRoutes = Router();
const categoryRepository = new CategoryRepository();

categoryRoutes.get("/", (request, response) => {
  const categories = categoryRepository.list();

  return response.json(categories);
});

categoryRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const createCategoryService = new CreateCategoryService(categoryRepository);

  createCategoryService.execute({ name, description });

  return response.status(201).send();
});

export { categoryRoutes };
