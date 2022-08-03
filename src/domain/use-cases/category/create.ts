import { inject, injectable } from "tsyringe";

import { ICategoryRepository } from "@domain/contracts/repositories/category";
import {
  ICreateCategoryUseCase,
  Input,
} from "@domain/contracts/use-cases/category/create";
import { AppError } from "@domain/errors/app-error";

@injectable()
class CreateCategoryUseCase implements ICreateCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  async execute({ name, description }: Input) {
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
