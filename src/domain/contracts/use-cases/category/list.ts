import { IBaseUseCase } from "@domain/contracts/use-cases/base-use-case";

import { Category } from "@infra/typeorm/entities/category";

type Input = void;

type Output = Promise<Category[]>;

type IListCategoriesUseCase = IBaseUseCase<Input, Output>;

export { IListCategoriesUseCase, Input };
