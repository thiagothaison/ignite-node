import { inject, injectable } from "tsyringe";

import { CreateCarImage } from "@domain/contracts/dtos/car-image/create";
import { ICarRepository } from "@domain/contracts/repositories/car";
import { ICarImageRepository } from "@domain/contracts/repositories/car-image";
import { AppError } from "@domain/errors/app-error";

type Input = {
  carId: string;
  images: string[];
};

@injectable()
class CreateCarImageUseCase {
  constructor(
    @inject("CarRepository") private carRepository: ICarRepository,
    @inject("CarImageRepository")
    private carImageRepository: ICarImageRepository
  ) {}

  async execute({ carId, images }: Input): CreateCarImage.Output {
    const car = await this.carRepository.findById(carId);

    if (!car) {
      throw new AppError("Car does not exists", 400);
    }

    images.forEach(async (image) => {
      await this.carImageRepository.create({ carId, image });
    });
  }
}

export { CreateCarImageUseCase };
