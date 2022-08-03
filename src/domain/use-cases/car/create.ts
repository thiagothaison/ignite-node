import { inject, injectable } from "tsyringe";

import { CreateCar } from "@domain/contracts/dtos/car/create-car";
import { ICarRepository } from "@domain/contracts/repositories/car";
import { AppError } from "@domain/errors/app-error";

@injectable()
class CreateCarUseCase {
  constructor(@inject("CarRepository") private carRepository: ICarRepository) {}

  async execute(parameters: CreateCar.Input): CreateCar.Output {
    const { licensePlate } = parameters;

    const carAlreadyExists = await this.carRepository.findByLicensePlate(
      licensePlate
    );

    if (carAlreadyExists) {
      throw new AppError(`O carro com a placa ${licensePlate} já existe`, 409);
    }

    await this.carRepository.create(parameters);
  }
}

export { CreateCarUseCase };
