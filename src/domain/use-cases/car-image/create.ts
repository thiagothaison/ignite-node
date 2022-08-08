import { inject, injectable } from "tsyringe";

import { ICarRepository } from "@domain/contracts/repositories/car";
import { ICarImageRepository } from "@domain/contracts/repositories/car-image";
import {
  ICreateCarImageUseCase,
  Input,
} from "@domain/contracts/use-cases/car-image/create";
import { AppError } from "@domain/errors/app-error";

@injectable()
class CreateCarImageUseCase implements ICreateCarImageUseCase {
  constructor(
    @inject("CarRepository") private carRepository: ICarRepository,
    @inject("CarImageRepository")
    private carImageRepository: ICarImageRepository
  ) {}

  async execute({ carId, images }: Input) {
    const car = await this.carRepository.findById(carId);

    if (!car) {
      throw new AppError("Car does not exists");
    }

    if (!images.length) {
      throw new AppError("No image sent");
    }

    const promises = images.map(async (image) => {
      await this.carImageRepository.create({ carId, image });
    });

    await Promise.all(promises);
  }
}

export { CreateCarImageUseCase };
