import { inject, injectable } from "tsyringe";

import { AppError } from "~/errors/AppError";

import { ISpecificationRepository } from "~/cars/types/repositories/Specification";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError(`A especificação ${name} já existe.`, 409);
    }

    this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
