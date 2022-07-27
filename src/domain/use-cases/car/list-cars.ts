import { inject, injectable } from "tsyringe";

import { ICarRepository } from "@domain/contracts/repositories/car";

@injectable()
class ListCarsUseCase {
  constructor(@inject("CarRepository") private carRepository: ICarRepository) {}

  async execute() {
    const cars = this.carRepository.list();

    return cars;
  }
}

export { ListCarsUseCase };
