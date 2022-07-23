import { inject, injectable } from "tsyringe";

import { AppError } from "~/errors/AppError";

import { ICategoryRepository } from "~/cars/types/repositories/Category";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
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
