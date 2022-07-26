import { v4 as uuidV4 } from "uuid";

import { Category } from "~/cars/entities/Category";
import { ICategoryRepository } from "~/cars/types/repositories/Category";

class CategoryRepository implements ICategoryRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
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
