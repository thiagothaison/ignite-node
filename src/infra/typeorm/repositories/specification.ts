import { inject, injectable } from "tsyringe";
import { DataSource, Repository } from "typeorm";

import { ISpecificationRepository } from "@domain/contracts/repositories/specification";

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

  async create(parameters) {
    const specification = this.repository.create(parameters);

    await this.repository.save(specification);
  }

  async list() {
    const specifications = await this.repository.find();

    return specifications;
  }

  async findByName(name) {
    const specification = await this.repository.findOne({ where: { name } });

    return specification;
  }
}

export { SpecificationRepository };
