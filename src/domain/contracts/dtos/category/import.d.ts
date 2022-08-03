export namespace ImportCategory {
  export type Input = Express.Multer.File;
  export type Output = Promise<void>;
  export type CsvContent = {
    name: string;
    description: string;
  };
}
