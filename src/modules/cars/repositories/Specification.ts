import { inject, injectable } from "tsyringe";
import { DataSource, Repository } from "typeorm";

import { Specification } from "~/cars/entities/Specification";
import { ISpecificationRepository } from "~/cars/types/repositories/Specification";

@injectable()
class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor(
    @inject("DataSource")
    private dataSource: DataSource
  ) {
    this.repository = this.dataSource.getRepository(Specification);
  }

  async create({ description, name }) {
    const specification = this.repository.create({
      name,
      description,
    });

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
