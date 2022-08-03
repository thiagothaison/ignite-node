import { IBaseUseCase } from "@domain/contracts/use-cases/base-use-case";

type Input = {
  name: string;
  description: string;
};

type Output = Promise<void>;

type ICreateSpecificationUseCase = IBaseUseCase<Input, Output>;

export { ICreateSpecificationUseCase, Input };
