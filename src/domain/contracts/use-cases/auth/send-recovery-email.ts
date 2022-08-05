import { IBaseUseCase } from "@domain/contracts/use-cases/base-use-case";

type Input = {
  email: string;
  baseUrl: string;
};
type Output = Promise<void>;

type ISendRecoveryEmailUseCase = IBaseUseCase<Input, Output>;

export { ISendRecoveryEmailUseCase, Input };
