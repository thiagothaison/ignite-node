import { ICarRepository } from "@domain/contracts/repositories/car";
import { ISpecificationRepository } from "@domain/contracts/repositories/specification";
import { AppError } from "@domain/errors/app-error";
import { AddSpecificationUseCase } from "@domain/use-cases/car/add-specification";

import { CarRepository } from "@tests/repositories/car";
import { SpecificationRepository } from "@tests/repositories/specification";

let carRepository: ICarRepository;
let specificationRepository: ISpecificationRepository;
let addSpecificationUseCase: AddSpecificationUseCase;

describe("Add specification", () => {
  beforeEach(() => {
    carRepository = new CarRepository();
    specificationRepository = new SpecificationRepository();
    addSpecificationUseCase = new AddSpecificationUseCase(
      carRepository,
      specificationRepository
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

  const createSpecification = async () => {
    const specification = await specificationRepository.create({
      name: "ABS",
      description: "This is a specification description",
    });

    return specification;
  };

  it("Should not be able to add a new specification to non-existent car", () => {
    return expect(async () => {
      const carId = "fake-car-id";
      const specificationIds = [
        "fake-specification-id",
        "another-fake-specification-id",
      ];

      await addSpecificationUseCase.execute({ carId, specificationIds });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to add a non-existent specification to car", () => {
    return expect(async () => {
      const car = await createCar();

      const specificationIds = ["fake-specification-id"];

      await addSpecificationUseCase.execute({
        carId: car.id,
        specificationIds,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to add a new specification to car", async () => {
    const newCar = await createCar();
    const specification = await createSpecification();

    const specificationIds = [specification.id];

    await addSpecificationUseCase.execute({
      carId: newCar.id,
      specificationIds,
    });

    const car = await carRepository.findById(newCar.id);

    expect(car.specifications).toContain(specification);
  });
});
