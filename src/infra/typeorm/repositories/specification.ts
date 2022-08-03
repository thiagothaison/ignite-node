import { inject, injectable } from "tsyringe";
import { DataSource, Repository } from "typeorm";

import {
  CreateParameters,
  ISpecificationRepository,
} from "@domain/contracts/repositories/specification";

import { Specification } from "@infra/typeorm/entities/specification";

@injectable()
class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor(
    @inject("DataSource")
    private dataSource: DataSource
  ) {
    this.repository = this.dataSource.getRepository(Specification);
  }

  async create(data: CreateParameters) {
    const specification = this.repository.create(data);

    await this.repository.save(specification);

    return specification;
  }

  async list() {
    const specifications = await this.repository.find();

    return specifications;
  }

  async findByName(name) {
    const specification = await this.repository.findOne({ where: { name } });

    return specification;
  }

  async findById(id) {
    const specification = await this.repository.findOne({ where: { id } });

    return specification;
  }
}

export { SpecificationRepository };
