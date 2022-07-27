import { v4 as uuidV4 } from "uuid";

import { ISpecificationRepository } from "@domain/contracts/repositories/specification";

import { Specification } from "@infra/typeorm/entities/specification";

class SpecificationRepository implements ISpecificationRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  async create({ name, description }: ICreateSpecification): Promise<void> {
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
