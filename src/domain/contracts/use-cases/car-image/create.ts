import { IBaseUseCase } from "@domain/contracts/use-cases/base-use-case";

type Input = {
  carId: string;
  images: string[];
};

type Output = Promise<void>;

type ICreateCarImageUseCase = IBaseUseCase<Input, Output>;

export { ICreateCarImageUseCase, Input };
