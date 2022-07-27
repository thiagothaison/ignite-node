import { inject, injectable } from "tsyringe";

import { ICategoryRepository } from "@domain/contracts/repositories/category";

import { Category } from "@infra/typeorm/entities/category";

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
