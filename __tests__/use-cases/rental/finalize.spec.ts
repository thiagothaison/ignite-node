import { IDateProvider } from "@domain/contracts/providers/date-provider";
import { ICarRepository } from "@domain/contracts/repositories/car";
import { IRentalRepository } from "@domain/contracts/repositories/rental";
import { IUserRepository } from "@domain/contracts/repositories/user";
import { AppError } from "@domain/errors/app-error";
import { FinalizeRentalUseCase } from "@domain/use-cases/rental/finalize";

import { CarRepository } from "@tests/repositories/car";
import { RentalRepository } from "@tests/repositories/rental";
import { UserRepository } from "@tests/repositories/user";

import { DayJsProvider } from "@infra/providers/date-provider/day-js-provider";

let rentalRepository: IRentalRepository;
let carRepository: ICarRepository;
let userRepository: IUserRepository;
let dayJsProvider: IDateProvider;
let finalizeRentalUseCase: FinalizeRentalUseCase;

describe("Create rental", () => {
  beforeEach(() => {
    rentalRepository = new RentalRepository();
    carRepository = new CarRepository();
    userRepository = new UserRepository();
    dayJsProvider = new DayJsProvider();

    finalizeRentalUseCase = new FinalizeRentalUseCase(
      rentalRepository,
      carRepository,
      dayJsProvider
    );
  });

  const createUser = async () => {
    const email = "user@domain.com";

    const user = await userRepository.create({
      name: "John Doe",
      email,
      password: "1a2b3c!@",
      isAdmin: false,
      driverLicense: "00000000123",
    });

    return user;
  };

  const createCar = async () => {
    const licensePlate = "BTU-2022";

    const car = await carRepository.create({
      brand: "Renault",
      dailyRate: 100,
      name: "Fluence",
      description: "Description Car",
      fineAmount: 60,
      licensePlate,
      categoryId: "uuu",
    });

    return car;
  };

  const createRental = async () => {
    const car = await createCar();
    const user = await createUser();

    const rental = await rentalRepository.create({
      carId: car.id,
      userId: user.id,
      startAt: dayJsProvider.yesterday(),
      expectedEndAt: dayJsProvider.now(),
    });

    return rental;
  };

  it("Should not be able to finalize an non-existent rental", () => {
    return expect(async () => {
      await finalizeRentalUseCase.execute({
        id: "fake-id",
        userId: "fake-user-id",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to finalize an rental already finished", () => {
    return expect(async () => {
      const { id: rentalId, userId } = await createRental();

      await finalizeRentalUseCase.execute({
        id: rentalId,
        userId,
      });

      await finalizeRentalUseCase.execute({
        id: rentalId,
        userId,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to finalize an rental for another user", () => {
    return expect(async () => {
      const { id: rentalId } = await createRental();

      await finalizeRentalUseCase.execute({
        id: rentalId,
        userId: "fake-another-user-id",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to finalize an existent rental", async () => {
    const { id: rentalId, userId, carId } = await createRental();

    const rental = await finalizeRentalUseCase.execute({
      id: rentalId,
      userId,
    });

    const car = await carRepository.findById(carId);

    expect(rental.endAt).not.toBeNull();
    expect(car.available).toBe(true);
  });
});
