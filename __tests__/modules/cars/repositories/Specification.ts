import { v4 as uuidV4 } from "uuid";

import { Specification } from "~/cars/entities/Specification";
import { ISpecificationRepository } from "~/cars/types/repositories/Specification";

class SpecificationRepository implements ISpecificationRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = new Specification();

    Object.assign(specification, { id: uuidV4(), name, description });

    this.specifications.push(specification);
  }

  async list(): Promise<Specification[]> {
    return this.specifications;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }
}

export { SpecificationRepository };
