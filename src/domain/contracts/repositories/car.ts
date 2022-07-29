import { CreateCar } from "@domain/contracts/dtos/car/create-car";
import { ListCars } from "@domain/contracts/dtos/car/list-cars";
import { UpdateCar } from "@domain/contracts/dtos/car/update-car";

import { Car } from "@infra/typeorm/entities/car";

interface ICarRepository {
  create(parameters: CreateCar.Input): CreateCar.Output;
  update(user: UpdateCar.Input): UpdateCar.Output;
  list(filters?: ListCars.Input): ListCars.Output;
  findByLicensePlate(licensePlate: string): Promise<Car>;
  findById(id: string): Promise<Car>;
}

export { ICarRepository };
