export namespace CreateCarImage {
  export type Input = {
    carId: string;
    image: string;
  };

  export type Output = Promise<void>;
}
