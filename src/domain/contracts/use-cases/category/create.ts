import { IBaseUseCase } from "@domain/contracts/use-cases/base-use-case";

type Input = {
  name: string;
  description: string;
};

type Output = Promise<void>;

type ICreateCategoryUseCase = IBaseUseCase<Input, Output>;

export { ICreateCategoryUseCase, Input };
