import { inject, injectable } from "tsyringe";

import { IDateProvider } from "@domain/contracts/providers/date-provider";
import { ICarRepository } from "@domain/contracts/repositories/car";
import { IRentalRepository } from "@domain/contracts/repositories/rental";
import {
  IFinalizeRentalUseCase,
  Input,
} from "@domain/contracts/use-cases/rental/finalize";
import { AppError } from "@domain/errors/app-error";

@injectable()
class FinalizeRentalUseCase implements IFinalizeRentalUseCase {
  constructor(
    @inject("RentalRepository") private rentalRepository: IRentalRepository,
    @inject("CarRepository") private carRepository: ICarRepository,
    @inject("DateProvider") private dateProvider: IDateProvider
  ) {}

  async execute({ id, userId }: Input) {
    const minimumDaily = 1;
    let rental = await this.rentalRepository.findById(id);

    if (!rental) {
      throw new AppError("Rental does not exists");
    }

    if (rental.endAt) {
      throw new AppError("Rental already is finished");
    }

    if (rental.userId !== userId) {
      throw new AppError("This rental is invalid", 401);
    }

    const car = await this.carRepository.findById(rental.carId);

    const now = this.dateProvider.now();
    const daily =
      this.dateProvider.compare(rental.startAt, now, "days") || minimumDaily;
    const delay = this.dateProvider.compare(now, rental.expectedEndAt, "days");

    const total = daily * car.dailyRate + delay * car.fineAmount;

    rental = await this.rentalRepository.finalize({
      id: rental.id,
      endAt: this.dateProvider.now(),
      total,
    });

    await this.carRepository.changeAvailability(car.id, true);

    return rental;
  }
}

export { FinalizeRentalUseCase };
