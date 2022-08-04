import { IDateProvider } from "@domain/contracts/providers/date-provider";
import { ICarRepository } from "@domain/contracts/repositories/car";
import { IRentalRepository } from "@domain/contracts/repositories/rental";
import { IUserRepository } from "@domain/contracts/repositories/user";
import { AppError } from "@domain/errors/app-error";
import { CreateRentalUseCase } from "@domain/use-cases/rental/create";

import { CarRepository } from "@tests/repositories/car";
import { RentalRepository } from "@tests/repositories/rental";
import { UserRepository } from "@tests/repositories/user";

import { DayJsProvider } from "@infra/providers/date-provider/day-js-provider";

let rentalRepository: IRentalRepository;
let carRepository: ICarRepository;
let userRepository: IUserRepository;
let dayJsProvider: IDateProvider;
let createRentalUseCase: CreateRentalUseCase;

describe("Create rental", () => {
  beforeEach(() => {
    rentalRepository = new RentalRepository();
    carRepository = new CarRepository();
    userRepository = new UserRepository();
    dayJsProvider = new DayJsProvider();

    createRentalUseCase = new CreateRentalUseCase(
      rentalRepository,
      carRepository,
      userRepository,
      dayJsProvider
    );
  });

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

  it("Should not be able to create a new rental for non-existent car", async () => {
    await expect(
      createRentalUseCase.execute({
        userId: "fake-user-id",
        carId: "fake-car-id",
        expectedEndAt: dayJsProvider.tomorrow(),
      })
    ).rejects.toEqual(new AppError("Car fake-car-id does not exists", 409));
  });

  it("Should not be able to create a new rental for non-existent user", async () => {
    const car = await createCar();

    await expect(
      createRentalUseCase.execute({
        userId: "fake-user-id",
        carId: car.id,
        expectedEndAt: dayJsProvider.tomorrow(),
      })
    ).rejects.toEqual(new AppError("User fake-user-id does not exists", 409));
  });

  it("Should be able to create a new rental", async () => {
    const car = await createCar();
    const user = await createUser();

    const rental = await createRentalUseCase.execute({
      userId: user.id,
      carId: car.id,
      expectedEndAt: dayJsProvider.tomorrow(),
    });

    const rentalCar = await carRepository.findById(car.id);

    expect(rental).toHaveProperty("id");
    expect(rentalCar.available).toBe(false);
  });

  it("Should not be able to create a new rental if there is another to the same car", async () => {
    const user = await createUser();
    const car = await createCar();

    await createRentalUseCase.execute({
      userId: user.id,
      carId: car.id,
      expectedEndAt: dayJsProvider.tomorrow(),
    });

    const anotherUser = await createUser();

    await expect(
      createRentalUseCase.execute({
        userId: anotherUser.id,
        carId: car.id,
        expectedEndAt: dayJsProvider.tomorrow(),
      })
    ).rejects.toEqual(
      new AppError(`Rental for car ${car.id} already exists`, 409)
    );
  });

  it("Should not be able to create a new rental if there is another to the same user", async () => {
    const car = await createCar();
    const user = await createUser();

    await createRentalUseCase.execute({
      userId: user.id,
      carId: car.id,
      expectedEndAt: dayJsProvider.tomorrow(),
    });

    const anotherCar = await createCar();

    return expect(
      createRentalUseCase.execute({
        userId: user.id,
        carId: anotherCar.id,
        expectedEndAt: dayJsProvider.tomorrow(),
      })
    ).rejects.toEqual(
      new AppError("There's a rental in progress for user", 409)
    );
  });

  it("Should not be able to create a new rental with invalid return time", async () => {
    const car = await createCar();
    const user = await createUser();

    await expect(
      createRentalUseCase.execute({
        userId: user.id,
        carId: car.id,
        expectedEndAt: dayJsProvider.now(),
      })
    ).rejects.toEqual(new AppError("Invalid return time"));
  });
});
