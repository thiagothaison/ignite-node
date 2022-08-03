import { IBaseUseCase } from "@domain/contracts/use-cases/base-use-case";

type Input = {
  name: string;
  email: string;
  password: string;
  driverLicense: string;
  isAdmin: boolean;
  avatar?: string;
};

type Output = Promise<void>;

type ICreateUserUseCase = IBaseUseCase<Input, Output>;

export { ICreateUserUseCase, Input };
