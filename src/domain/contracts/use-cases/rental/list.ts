import { IBaseUseCase } from "@domain/contracts/use-cases/base-use-case";

import { Rental } from "@infra/typeorm/entities/rental";

type Input = {
  carId?: string;
  userId?: string;
  startAt?: Date;
  endAt?: Date;
  expectedEndAt?: Date;
};

type Output = Promise<Rental[]>;

type IListRentalsUseCase = IBaseUseCase<Input, Output>;

export { IListRentalsUseCase, Input };
