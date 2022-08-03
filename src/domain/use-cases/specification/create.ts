import { inject, injectable } from "tsyringe";

import { ISpecificationRepository } from "@domain/contracts/repositories/specification";
import {
  ICreateSpecificationUseCase,
  Input,
} from "@domain/contracts/use-cases/specifications/create";
import { AppError } from "@domain/errors/app-error";

@injectable()
class CreateSpecificationUseCase implements ICreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute({ name, description }: Input) {
    const specificationAlreadyExists =
      await this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError(`A especificação ${name} já existe.`, 409);
    }

    this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
