import { Car } from "@infra/typeorm/entities/car";

export namespace ListCars {
  export type Input = {
    categoryId?: string;
    brand?: string;
    name?: string;
    available?: boolean;
  };

  export type Output = Promise<Car[]>;
}
