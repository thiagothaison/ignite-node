import { inject, injectable } from "tsyringe";

import { Category } from "~/cars/entities/Category";
import { ICategoryRepository } from "~/cars/types/repositories/Category";

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(): Promise<Category[]> {
    return this.categoryRepository.list();
  }
}

export { ListCategoriesUseCase };
