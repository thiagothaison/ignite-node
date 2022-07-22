import { inject, injectable } from "tsyringe";

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
      throw new Error(`A categoria ${name} já existe.`);
    }

    await this.categoryRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
