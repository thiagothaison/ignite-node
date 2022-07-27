import { Category } from "@infra/typeorm/entities/category";

interface ICategoryRepository {
  create({ name, description }: ICreateCategory): Promise<void>;
  list(): Promise<Category[]>;
  findByName(name: string): Promise<Category>;
}

export { ICategoryRepository };
