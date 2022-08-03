import { inject, injectable } from "tsyringe";

import { ListCars } from "@domain/contracts/dtos/car/list";
import { ICarRepository } from "@domain/contracts/repositories/car";

@injectable()
class ListCarsUseCase {
  constructor(@inject("CarRepository") private carRepository: ICarRepository) {}

  async execute(filters?: ListCars.Input): ListCars.Output {
    const cars = this.carRepository.list(filters);

    return cars;
  }
}

export { ListCarsUseCase };
