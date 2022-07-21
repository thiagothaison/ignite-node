import { Specification } from "~/root/src/modules/cars/entities/Specification";

import { ISpecificationRepository } from "~/cars/types/repositories/Specification";

class ListSpecificationsUseCase {
  constructor(private specificationRepository: ISpecificationRepository) {}

  async execute(): Promise<Specification[]> {
    return this.specificationRepository.list();
  }
}

export { ListSpecificationsUseCase };
