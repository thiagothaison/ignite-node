import { v4 as uuidV4 } from "uuid";

import {
  CreateParameters,
  ICarRepository,
  ListFilters,
  UpdateParameters,
} from "@domain/contracts/repositories/car";

import { Car } from "@infra/typeorm/entities/car";

class CarRepository implements ICarRepository {
  private cars: Car[];

  constructor() {
    this.cars = [];
  }

  async create(data: CreateParameters) {
    const car = new Car();

    Object.assign(car, {
      available: true,
      ...data,
      id: uuidV4(),
    });

    this.cars.push(car);

    return car;
  }

  async update(data: UpdateParameters) {
    this.cars = this.cars.map((currentCar) =>
      currentCar.id === data.id ? currentCar : (data as Car)
    );
  }

  async list(filters: ListFilters) {
    return this.cars.filter((car) => {
      if (!filters) return true;

      let passed = true;

      Object.keys(filters).forEach((key) => {
        if (car[key] !== filters[key]) {
          passed = false;
        }
      });

      return passed;
    });
  }

  async findByLicensePlate(licensePlate) {
    const car = this.cars.find((car) => car.licensePlate === licensePlate);

    return car;
  }

  async findById(id) {
    const car = this.cars.find((car) => car.id === id);

    return car;
  }

  async changeAvailability(id, available = true) {
    const car = await this.findById(id);
    car.available = available;

    this.cars = this.cars.map((currentCar) =>
      currentCar.id === id ? car : currentCar
    );

    return car;
  }
}

export { CarRepository };
