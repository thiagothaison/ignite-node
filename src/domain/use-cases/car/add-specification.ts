import { inject, injectable } from "tsyringe";

import { AddSpecification } from "@domain/contracts/dtos/car/add-specification";
import { ICarRepository } from "@domain/contracts/repositories/car";
import { ISpecificationRepository } from "@domain/contracts/repositories/specification";
import {
  IAddSpecificationUseCase,
  Input,
} from "@domain/contracts/use-cases/car/add-specification";
import { AppError } from "@domain/errors/app-error";

import { Car } from "@infra/typeorm/entities/car";
import { Specification } from "@infra/typeorm/entities/specification";

@injectable()
class AddSpecificationUseCase implements IAddSpecificationUseCase {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository,
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  async validateCar(carId) {
    const car = await this.carRepository.findById(carId);

    if (!car) {
      throw new AppError("Car does not exists", 400);
    }

    return car;
  }

  async validateSpecifications(specificationIds) {
    const promises = specificationIds.map(async (specificationId) => {
      const specificationExists = await this.specificationRepository.findById(
        specificationId
      );

      if (!specificationExists) {
        throw new AppError(
          `Specification ${specificationId} does not exists`,
          400
        );
      }

      return specificationExists;
    });

    const specifications = await Promise.all(promises);

    return specifications;
  }

  async execute({ carId, specificationIds }: Input) {
    const car = await this.validateCar(carId);
    const specifications = await this.validateSpecifications(specificationIds);

    car.specifications = specifications;

    await this.carRepository.update(car);
  }
}

export { AddSpecificationUseCase };
