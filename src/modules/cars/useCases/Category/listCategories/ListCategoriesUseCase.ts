import { ICategoryRepository } from "~/cars/types/repositories/Category";
import { Category } from "~/root/src/modules/cars/entities/Category";

class ListCategoriesUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  execute(): Category[] {
    return this.categoryRepository.list();
  }
}

export { ListCategoriesUseCase };
