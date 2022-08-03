import { v4 as uuidV4 } from "uuid";

import {
  CreateParameters,
  ICategoryRepository,
} from "@domain/contracts/repositories/category";

import { Category } from "@infra/typeorm/entities/category";

class CategoryRepository implements ICategoryRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  async create(data: CreateParameters) {
    const category = new Category();

    Object.assign(category, { id: uuidV4(), ...data });

    this.categories.push(category);

    return category;
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
