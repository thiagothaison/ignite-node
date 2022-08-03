import { IBaseUseCase } from "@domain/contracts/use-cases/base-use-case";

type Input = {
  categoryId: string;
  name: string;
  description: string;
  dailyRate: number;
  available?: boolean;
  licensePlate: string;
  fineAmount: number;
  brand: string;
};

type Output = Promise<void>;

type ICreateCarUseCase = IBaseUseCase<Input, Output>;

export { ICreateCarUseCase, Input };
