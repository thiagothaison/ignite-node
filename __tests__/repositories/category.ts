import { v4 as uuidV4 } from "uuid";

import { ICategoryRepository } from "@domain/contracts/repositories/category";

import { Category } from "@infra/typeorm/entities/category";

class CategoryRepository implements ICategoryRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  async create({ name, description }) {
    const category = new Category();

    Object.assign(category, { id: uuidV4(), name, description });

    this.categories.push(category);
  }

  async list() {
    return this.categories;
  }

  async findByName(name: string) {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }
}

export { CategoryRepository };
