import { Category } from "@infra/typeorm/entities/category";

export namespace ListCategories {
  export type Output = Promise<Category[]>;
}
