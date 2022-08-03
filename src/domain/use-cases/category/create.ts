import { inject, injectable } from "tsyringe";

import { CreateCategory } from "@domain/contracts/dtos/category/create-category";
import { ICategoryRepository } from "@domain/contracts/repositories/category";
import { AppError } from "@domain/errors/app-error";

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  async execute({
    name,
    description,
  }: CreateCategory.Input): CreateCategory.Output {
    const categoryAlreadyExists = await this.categoryRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new AppError(`A categoria ${name} já existe.`, 409);
    }

    await this.categoryRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
