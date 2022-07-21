import { DataSource, Repository } from "typeorm";

import { Category } from "~/cars/entities/Category";
import { ICategoryRepository } from "~/cars/types/repositories/Category";

class CategoryRepository implements ICategoryRepository {
  private repository: Repository<Category>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Category);
  }

  async create({ description, name }) {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
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
