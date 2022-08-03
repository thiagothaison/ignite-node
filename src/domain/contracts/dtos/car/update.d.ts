import { Specification } from "@infra/typeorm/entities/specification";

export namespace UpdateCar {
  export type Input = {
    id: string;
    categoryId: string;
    name: string;
    description: string;
    dailyRate: number;
    available?: boolean;
    licensePlate: string;
    fineAmount: number;
    brand: string;
    specifications?: Specification[];
  };

  export type Output = Promise<void>;
}
