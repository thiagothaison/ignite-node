import { Category } from "~/cars/entities/Category";

interface ICategoryRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
  list(): Promise<Category[]>;
  findByName(name: string): Promise<Category>;
}

export { ICategoryRepository };
