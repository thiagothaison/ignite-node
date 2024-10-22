import { inject, injectable } from "tsyringe";

import { IDateProvider } from "@domain/contracts/providers/date-provider";
import { ICarRepository } from "@domain/contracts/repositories/car";
import { IRentalRepository } from "@domain/contracts/repositories/rental";
import { IUserRepository } from "@domain/contracts/repositories/user";
import {
  ICreateRentalUseCase,
  Input,
} from "@domain/contracts/use-cases/rental/create";
import { AppError } from "@domain/errors/app-error";

@injectable()
class CreateRentalUseCase implements ICreateRentalUseCase {
  constructor(
    @inject("RentalRepository") private rentalRepository: IRentalRepository,
    @inject("CarRepository") private carRepository: ICarRepository,
    @inject("UserRepository") private userRepository: IUserRepository,
    @inject("DateProvider") private dateProvider: IDateProvider
  ) {}

  async execute(parameters: Input) {
    const minimumHoursToCreateRental = 24;

    const { carId, userId, expectedEndAt } = parameters;
    const car = await this.carRepository.findById(carId);

    if (!car) {
      throw new AppError(`Car ${carId} does not exists`, 409);
    }

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError(`User ${userId} does not exists`, 409);
    }

    const isCarUnavailable = await this.rentalRepository.findOpenRentalByCar(
      carId
    );

    if (isCarUnavailable) {
      throw new AppError(`Rental for car ${carId} already exists`, 409);
    }

    const isOpenedRentalForUser =
      await this.rentalRepository.findOpenRentalByUser(userId);

    if (isOpenedRentalForUser) {
      throw new AppError("There's a rental in progress for user", 409);
    }

    const compare = this.dateProvider.compare(
      this.dateProvider.now(),
      expectedEndAt
    );

    if (compare < minimumHoursToCreateRental) {
      throw new AppError("Invalid return time");
    }

    const rental = await this.rentalRepository.create({
      carId,
      userId,
      expectedEndAt,
    });

    await this.carRepository.changeAvailability(carId, false);

    return rental;
  }
}

export { CreateRentalUseCase };
