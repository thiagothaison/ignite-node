import { Specification } from "~/root/src/modules/cars/entities/Specification";

import { inject, injectable } from "tsyringe";

import { ISpecificationRepository } from "~/cars/types/repositories/Specification";

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
