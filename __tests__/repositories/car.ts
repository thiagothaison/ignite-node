import { v4 as uuidV4 } from "uuid";

import { ICarRepository } from "@domain/contracts/repositories/car";

import { Car } from "@infra/typeorm/entities/car";

class CarRepository implements ICarRepository {
  private cars: Car[];

  constructor() {
    this.cars = [];
  }

  async create(parameters) {
    const car = new Car();

    Object.assign(car, {
      available: true,
      ...parameters,
      id: uuidV4(),
    });

    this.cars.push(car);
  }

  async list() {
    return this.cars;
  }

  async findByLicensePlate(licensePlate) {
    const car = this.cars.find((car) => car.licensePlate === licensePlate);

    return car;
  }
}

export { CarRepository };
