import { Category } from "~/root/src/modules/cars/entities/Category";

interface ICategoryRepository {
  findByName(name: string): Category;
  list(): Category[];
  create({ name, description }: ICreateCategoryDTO): void;
}

export { ICategoryRepository };
