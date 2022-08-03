import { inject, injectable } from "tsyringe";

import { ICarRepository } from "@domain/contracts/repositories/car";
import {
  ICreateCarUseCase,
  Input,
} from "@domain/contracts/use-cases/car/create";
import { AppError } from "@domain/errors/app-error";

@injectable()
class CreateCarUseCase implements ICreateCarUseCase {
  constructor(@inject("CarRepository") private carRepository: ICarRepository) {}

  async execute(parameters: Input) {
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
