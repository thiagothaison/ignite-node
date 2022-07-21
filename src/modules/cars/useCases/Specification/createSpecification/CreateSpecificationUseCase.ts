import { ISpecificationRepository } from "~/cars/types/repositories/Specification";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationRepository) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error(`A especificação ${name} já existe.`);
    }

    this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
