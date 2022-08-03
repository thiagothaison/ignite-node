import { inject, injectable } from "tsyringe";

import { ICarRepository } from "@domain/contracts/repositories/car";
import { IListCarsUseCase, Input } from "@domain/contracts/use-cases/car/list";

@injectable()
class ListCarsUseCase implements IListCarsUseCase {
  constructor(@inject("CarRepository") private carRepository: ICarRepository) {}

  async execute(filters?: Input) {
    const cars = this.carRepository.list(filters);

    return cars;
  }
}

export { ListCarsUseCase };
