import { inject, injectable } from "tsyringe";

import { ListSpecifications } from "@domain/contracts/dtos/specification/list";
import { ISpecificationRepository } from "@domain/contracts/repositories/specification";

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute(): ListSpecifications.Output {
    return this.specificationRepository.list();
  }
}

export { ListSpecificationsUseCase };
