import { v4 as uuidV4 } from "uuid";

import { ISpecificationRepository } from "@domain/contracts/repositories/specification";

import { Specification } from "@infra/typeorm/entities/specification";

class SpecificationRepository implements ISpecificationRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  async create(parameters) {
    const specification = new Specification();

    Object.assign(specification, { id: uuidV4(), ...parameters });

    this.specifications.push(specification);
  }

  async list() {
    return this.specifications;
  }

  async findByName(name) {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }

  async findById(id) {
    const specification = this.specifications.find(
      (specification) => specification.id === id
    );

    return specification;
  }
}

export { SpecificationRepository };
