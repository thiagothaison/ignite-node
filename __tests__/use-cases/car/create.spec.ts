import { ICarRepository } from "@domain/contracts/repositories/car";
import { AppError } from "@domain/errors/app-error";
import { CreateCarUseCase } from "@domain/use-cases/car/create";

import { CarRepository } from "@tests/repositories/car";

let carRepository: ICarRepository;
let createCarUseCase: CreateCarUseCase;

describe("Create car", () => {
  beforeEach(() => {
    carRepository = new CarRepository();
    createCarUseCase = new CreateCarUseCase(carRepository);
  });

  const createCar = async () => {
    const licensePlate = "BTU-2022";

    await createCarUseCase.execute({
      brand: "Renault",
      dailyRate: 100,
      name: "Fluence",
      description: "Description Car",
      fineAmount: 60,
      licensePlate,
      categoryId: "uuu",
    });

    const car = await carRepository.findByLicensePlate(licensePlate);

    return car;
  };

  it("Should be able to create a new car", async () => {
    const car = await createCar();

    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a new car with existing license plate", () => {
    expect(async () => {
      await createCar();

      await createCar();
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to create a car with available true as default", async () => {
    const car = await createCar();

    expect(car.available).toBe(true);
  });
});
