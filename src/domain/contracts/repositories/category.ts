import { CreateCategory } from "@domain/contracts/dtos/category/create-category";
import { ListCategories } from "@domain/contracts/dtos/category/list-categories";

import { Category } from "@infra/typeorm/entities/category";

interface ICategoryRepository {
  create(parameters: CreateCategory.Input): CreateCategory.Output;
  list(): ListCategories.Output;
  findByName(name: string): Promise<Category>;
}

export { ICategoryRepository };
