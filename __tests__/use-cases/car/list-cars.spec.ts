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
});
