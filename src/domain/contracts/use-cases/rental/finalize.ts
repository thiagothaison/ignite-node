import { IBaseUseCase } from "@domain/contracts/use-cases/base-use-case";

import { Rental } from "@infra/typeorm/entities/rental";

type Input = {
  id: string;
  userId: string;
};

type Output = Promise<Rental>;

type IFinalizeRentalUseCase = IBaseUseCase<Input, Output>;

export { IFinalizeRentalUseCase, Input };
