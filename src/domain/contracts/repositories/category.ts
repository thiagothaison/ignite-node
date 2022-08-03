import { Category } from "@infra/typeorm/entities/category";

type CreateParameters = {
  name: string;
  description: string;
};

interface ICategoryRepository {
  create(data: CreateParameters): Promise<Category>;
  list(): Promise<Category[]>;
  findByName(name: string): Promise<Category>;
}

export { ICategoryRepository, CreateParameters };
