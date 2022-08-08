import { ICarRepository } from "@domain/contracts/repositories/car";
import { ICarImageRepository } from "@domain/contracts/repositories/car-image";
import { AppError } from "@domain/errors/app-error";
import { CreateCarImageUseCase } from "@domain/use-cases/car-image/create";

import { CarRepository } from "@tests/repositories/car";
import { CarImageRepository } from "@tests/repositories/car-image";

let carRepository: ICarRepository;
let carImageRepository: ICarImageRepository;
let createCarUseCase: CreateCarImageUseCase;

jest.mock("@tests/repositories/car-image");

describe("Create car", () => {
  beforeEach(() => {
    carRepository = new CarRepository();
    carImageRepository = new CarImageRepository();
    createCarUseCase = new CreateCarImageUseCase(
      carRepository,
      carImageRepository
    );
  });

  const createCar = async () => {
    const licensePlate = "BTU-2022";

    return carRepository.create({
      brand: "Renault",
      dailyRate: 100,
      name: "Fluence",
      description: "Description Car",
      fineAmount: 60,
      licensePlate,
      categoryId: "uuu",
    });
  };

  it("Should not be able to create a new car image if car does not exists", async () => {
    await expect(
      createCarUseCase.execute({ carId: "fake-car-id", images: [] })
    ).rejects.toEqual(new AppError("Car does not exists"));
  });

  it("Should not be able to create a new car image if no image sent", async () => {
    const car = await createCar();

    await expect(
      createCarUseCase.execute({ carId: car.id, images: [] })
    ).rejects.toEqual(new AppError("No image sent"));
  });

  it("Should be able to create a new car image", async () => {
    const car = await createCar();

    await createCarUseCase.execute({ carId: car.id, images: ["fake-image"] });

    expect(carImageRepository.create).toHaveBeenCalled();
  });
});
