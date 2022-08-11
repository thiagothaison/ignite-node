import { UserTransformer } from "@domain/contracts/transformers/user";
import { IBaseUseCase } from "@domain/contracts/use-cases/base-use-case";

type Input = string;

type Output = Promise<UserTransformer>;

type IProfileUseCase = IBaseUseCase<Input, Output>;

export { IProfileUseCase, Input };
