import { inject, injectable } from "tsyringe";

import { ISpecificationRepository } from "@domain/contracts/repositories/specification";
import { IListSpecificationsUseCase } from "@domain/contracts/use-cases/specifications/list";

@injectable()
class ListSpecificationsUseCase implements IListSpecificationsUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute() {
    return this.specificationRepository.list();
  }
}

export { ListSpecificationsUseCase };
