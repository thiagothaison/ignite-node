export namespace AddSpecification {
  export type Input = {
    carId: string;
    specificationIds: string[];
  };

  export type Output = Promise<void>;
}
