import { ICarRepository } from "@domain/contracts/repositories/car";
import { ListCarsUseCase } from "@domain/use-cases/car/list-cars";

import { CarRepository } from "@tests/repositories/car";

let carRepository: ICarRepository;
let listCarsUseCase: ListCarsUseCase;

describe("List cars", () => {
  beforeEach(() => {
    carRepository = new CarRepository();
    listCarsUseCase = new ListCarsUseCase(carRepository);
  });

  const fillCars = async () => {
    await carRepository.create({
      brand: "Toyota",
      dailyRate: 100,
      name: "Etios",
      description: "Nave do paizão",
      fineAmount: 60,
      licensePlate: "FBB-2022",
      categoryId: "uuu",
      available: true,
    });

    await carRepository.create({
      brand: "Renault",
      dailyRate: 100,
      name: "Fluence",
      description: "Nave do Thiago",
      fineAmount: 60,
      licensePlate: "BTU-2022",
      categoryId: "uuu",
    });

    await carRepository.create({
      brand: "Hyundai",
      dailyRate: 100,
      name: "HB20",
      description: "",
      fineAmount: 60,
      licensePlate: "CPH-2022",
      categoryId: "xxx",
    });
  };

  it("Should be able to return a empty list", async () => {
    const cars = await listCarsUseCase.execute();

    expect(cars).toHaveLength(0);
  });

  it("Should be able to return a list", async () => {
    await carRepository.create({
      brand: "Renault",
      dailyRate: 100,
      name: "Fluence",
      description: "Description Car",
      fineAmount: 60,
      licensePlate: "BTU-2022",
      categoryId: "uuu",
    });

    const cars = await listCarsUseCase.execute();

    expect(cars).toHaveLength(1);
  });

  it("Should be able to return a list with available cars only", async () => {
    await fillCars();

    const cars = await listCarsUseCase.execute({ available: true });
    const hasOnlyAvailable = cars.every((car) => car.available);

    expect(hasOnlyAvailable).toBe(true);
  });

  it("Should be able to return a list filtered by name", async () => {
    await fillCars();

    const name = "Etios";

    const cars = await listCarsUseCase.execute({ name });
    const hasOnlyAvailable = cars.every((car) => car.name === name);

    expect(hasOnlyAvailable).toBe(true);
  });

  it("Should be able to return a list filtered by brand", async () => {
    await fillCars();

    const brand = "Renault";

    const cars = await listCarsUseCase.execute({ brand });
    const hasOnlyAvailable = cars.every((car) => car.brand === brand);

    expect(hasOnlyAvailable).toBe(true);
  });

  it("Should be able to return a list filtered by category id", async () => {
    await fillCars();

    const categoryId = "xxx";

    const cars = await listCarsUseCase.execute({ categoryId });
    const hasOnlyAvailable = cars.every((car) => car.categoryId === categoryId);

    expect(hasOnlyAvailable).toBe(true);
  });
});
