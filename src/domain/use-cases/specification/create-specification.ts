import { inject, injectable } from "tsyringe";

import { CreateSpecification } from "@domain/contracts/dtos/specification/create-specification";
import { ISpecificationRepository } from "@domain/contracts/repositories/specification";
import { AppError } from "@domain/errors/app-error";

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute({
    name,
    description,
  }: CreateSpecification.Input): CreateSpecification.Output {
    const specificationAlreadyExists =
      await this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError(`A especificação ${name} já existe.`, 409);
    }

    this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
