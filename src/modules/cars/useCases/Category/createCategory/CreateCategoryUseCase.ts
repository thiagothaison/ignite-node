import { ICategoryRepository } from "~/cars/types/repositories/Category";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  execute({ name, description }: IRequest): void {
    const categoryAlreadyExists = this.categoryRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error(`A categoria ${name} já existe.`);
    }

    this.categoryRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
