import { IDateProvider } from "@domain/contracts/providers/date-provider";
import { ICarRepository } from "@domain/contracts/repositories/car";
import { IRentalRepository } from "@domain/contracts/repositories/rental";
import { IUserRepository } from "@domain/contracts/repositories/user";
import { AppError } from "@domain/errors/app-error";
import { ListRentalsUseCase } from "@domain/use-cases/rental/list";

import { CarRepository } from "@tests/repositories/car";
import { RentalRepository } from "@tests/repositories/rental";
import { UserRepository } from "@tests/repositories/user";

import { DayJsProvider } from "@infra/providers/date-provider/day-js-provider";

let rentalRepository: IRentalRepository;
let carRepository: ICarRepository;
let userRepository: IUserRepository;
let dayJsProvider: IDateProvider;
let listRentalsUseCase: ListRentalsUseCase;

describe("Create rental", () => {
  beforeEach(() => {
    rentalRepository = new RentalRepository();
    carRepository = new CarRepository();
    userRepository = new UserRepository();
    dayJsProvider = new DayJsProvider();

    listRentalsUseCase = new ListRentalsUseCase(rentalRepository);
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

  it("Should be able to return a empty list", async () => {
    const rentals = await listRentalsUseCase.execute();

    expect(rentals).toHaveLength(0);
  });

  it("Should be able to return a list", async () => {
    await createRental();
    const rentals = await listRentalsUseCase.execute();

    expect(rentals).toHaveLength(1);
  });

  it("Should be able to return a list with user rentals only", async () => {
    await createRental();
    const rentals = await listRentalsUseCase.execute({
      userId: "fake-user-id",
    });

    expect(rentals).toHaveLength(0);
  });
});
