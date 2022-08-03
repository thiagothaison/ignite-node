import { inject, injectable } from "tsyringe";

import { ICategoryRepository } from "@domain/contracts/repositories/category";
import { IListCategoriesUseCase } from "@domain/contracts/use-cases/category/list";

@injectable()
class ListCategoriesUseCase implements IListCategoriesUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  async execute() {
    return this.categoryRepository.list();
  }
}

export { ListCategoriesUseCase };
