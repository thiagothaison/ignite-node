import { IBaseUseCase } from "@domain/contracts/use-cases/base-use-case";

import { Car } from "@infra/typeorm/entities/car";

type Input = {
  categoryId?: string;
  brand?: string;
  name?: string;
  available?: boolean;
};

type Output = Promise<Car[]>;

type IListCarsUseCase = IBaseUseCase<Input, Output>;

export { IListCarsUseCase, Input };
