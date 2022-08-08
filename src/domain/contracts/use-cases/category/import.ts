import { IBaseUseCase } from "@domain/contracts/use-cases/base-use-case";

type CsvContent = {
  name: string;
  description: string;
};

type Input = Express.Multer.File;

type Output = Promise<{
  successes: CsvContent[];
  errors: CsvContent[];
}>;

interface IImportCategoryUseCase extends IBaseUseCase<Input, Output> {
  loadCategories(file: Express.Multer.File): Promise<CsvContent[]>;
}

export { IImportCategoryUseCase, Input, CsvContent };
