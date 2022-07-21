import { Category } from "~/cars/entities/Category";
import { ICategoryRepository } from "~/cars/types/repositories/Category";

class ListCategoriesUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  execute(): Category[] {
    return this.categoryRepository.list();
  }
}

export { ListCategoriesUseCase };
