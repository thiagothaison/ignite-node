import { Rental } from "@infra/typeorm/entities/rental";

export namespace ListRentals {
  export type Input = {
    carId?: string;
    userId?: string;
    startAt?: Date;
    endAt?: Date;
    expectedEndAt?: Date;
  };

  export type Output = Promise<Rental[]>;
}
