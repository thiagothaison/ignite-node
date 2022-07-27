import { Car } from "@infra/typeorm/entities/car";

export namespace ListCars {
  export type Output = Promise<Car[]>;
}
