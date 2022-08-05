import { IBaseUseCase } from "@domain/contracts/use-cases/base-use-case";

type Input = {
  token: string;
  password: string;
  confirmPassword: string;
};
type Output = Promise<void>;

type IResetPasswordUseCase = IBaseUseCase<Input, Output>;

export { IResetPasswordUseCase, Input };
