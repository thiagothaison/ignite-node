import { IBaseUseCase } from "@domain/contracts/use-cases/base-use-case";

import { Car } from "@infra/typeorm/entities/car";
import { Specification } from "@infra/typeorm/entities/specification";

type Input = {
  carId: string;
  specificationIds: string[];
};

type Output = Promise<void>;

type ValidateCar = {
  (carId: string): Promise<Car>;
};

type ValidateSpecifications = {
  (specificationIds: string[]): Promise<Specification[]>;
};

interface IAddSpecificationUseCase extends IBaseUseCase<Input, Output> {
  validateCar: ValidateCar;
  validateSpecifications: ValidateSpecifications;
}

export { IAddSpecificationUseCase, Input };
