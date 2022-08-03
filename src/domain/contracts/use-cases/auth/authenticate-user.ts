import { IBaseUseCase } from "@domain/contracts/use-cases/base-use-case";

type Input = {
  email: string;
  password: string;
};

type Output = Promise<{
  user: {
    name: string;
    email: string;
  };
  token: string;
}>;

type IAuthenticateUserUseCase = IBaseUseCase<Input, Output>;

export { IAuthenticateUserUseCase, Input };
