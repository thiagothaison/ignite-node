import { Specification } from "~/cars/models/Specification";
import { ISpecificationRepository } from "~/cars/types/repositories/Specification";

class ListSpecificationsUseCase {
  constructor(private specificationRepository: ISpecificationRepository) {}

  execute(): Specification[] {
    return this.specificationRepository.list();
  }
}

export { ListSpecificationsUseCase };
