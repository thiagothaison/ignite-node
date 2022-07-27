export namespace CreateCategory {
  export type Input = {
    name: string;
    description: string;
  };

  export type Output = Promise<void>;
}
