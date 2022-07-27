import { v4 as uuidV4 } from "uuid";

import { ICategoryRepository } from "@domain/contracts/repositories/category";

import { Category } from "@infra/typeorm/entities/category";

class CategoryRepository implements ICategoryRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  async create({ name, description }: ICreateCategory): Promise<void> {
    const category = new Category();

    Object.assign(category, { id: uuidV4(), name, description });

    this.categories.push(category);
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }
}

export { CategoryRepository };
