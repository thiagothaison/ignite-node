import { CreateCar } from "@domain/contracts/dtos/car/create-car";
import { ListCars } from "@domain/contracts/dtos/car/list-cars";

import { Car } from "@infra/typeorm/entities/car";

interface ICarRepository {
  create(parameters: CreateCar.Input): CreateCar.Output;
  list(): ListCars.Output;
  findByLicensePlate(licensePlate: string): Promise<Car>;
}

export { ICarRepository };
