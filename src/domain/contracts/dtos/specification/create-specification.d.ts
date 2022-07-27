export namespace CreateSpecification {
  export type Input = {
    name: string;
    description: string;
  };

  export type Output = Promise<void>;
}
