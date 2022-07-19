import { Category } from "~/cars/models/Category";
import { ICategoryRepository } from "~/cars/types/repositories/Category";

class CategoryRepository implements ICategoryRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  public create({ description, name }: ICreateCategoryDTO) {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);
  }

  public list() {
    return this.categories;
  }

  public findByName(name: string) {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }
}

export { CategoryRepository };
