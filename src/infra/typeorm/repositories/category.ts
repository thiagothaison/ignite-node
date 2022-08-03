import { inject, injectable } from "tsyringe";
import { DataSource, Repository } from "typeorm";

import {
  CreateParameters,
  ICategoryRepository,
} from "@domain/contracts/repositories/category";

import { Category } from "@infra/typeorm/entities/category";

@injectable()
class CategoryRepository implements ICategoryRepository {
  private repository: Repository<Category>;

  constructor(
    @inject("DataSource")
    private dataSource: DataSource
  ) {
    this.repository = this.dataSource.getRepository(Category);
  }

  async create(data: CreateParameters) {
    const category = this.repository.create(data);

    await this.repository.save(category);

    return category;
  }

  async list() {
    const categories = await this.repository.find();

    return categories;
  }

  async findByName(name) {
    const category = await this.repository.findOne({ where: { name } });

    return category;
  }
}

export { CategoryRepository };
