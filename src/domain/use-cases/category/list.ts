import { inject, injectable } from "tsyringe";

import { ListCategories } from "@domain/contracts/dtos/category/list";
import { ICategoryRepository } from "@domain/contracts/repositories/category";

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(): ListCategories.Output {
    return this.categoryRepository.list();
  }
}

export { ListCategoriesUseCase };
