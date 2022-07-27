import { inject, injectable } from "tsyringe";

import { ISpecificationRepository } from "@domain/contracts/repositories/specification";

import { Specification } from "@infra/typeorm/entities/specification";

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute(): Promise<Specification[]> {
    return this.specificationRepository.list();
  }
}

export { ListSpecificationsUseCase };
