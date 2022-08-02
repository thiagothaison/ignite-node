import { Rental } from "@infra/typeorm/entities/rental";

export namespace CreateRental {
  export type Input = {
    carId: string;
    userId: string;
    startAt?: Date;
    endAt?: Date;
    expectedEndAt: Date;
    total?: number;
  };

  export type Output = Promise<Rental>;
}
