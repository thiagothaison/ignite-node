export namespace CreateCar {
  export type Input = {
    categoryId: string;
    name: string;
    description: string;
    dailyRate: number;
    available?: boolean;
    licensePlate: string;
    fineAmount: number;
    brand: string;
  };

  export type Output = Promise<void>;
}
