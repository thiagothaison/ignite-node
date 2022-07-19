import { Category } from "~/cars/models/Category";

interface ICategoryRepository {
  findByName(name: string): Category;
  list(): Category[];
  create({ name, description }: ICreateCategoryDTO): void;
}

export { ICategoryRepository };
