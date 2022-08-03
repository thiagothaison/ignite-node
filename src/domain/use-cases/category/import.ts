import { parse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ICategoryRepository } from "@domain/contracts/repositories/category";
import {
  CsvContent,
  IImportCategoryUseCase,
  Input,
} from "@domain/contracts/use-cases/category/import";

@injectable()
class ImportCategoryUseCase implements IImportCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  async loadCategories(file: Input) {
    return new Promise<CsvContent[]>((resolve, reject) => {
      const categories = [];

      const stream = fs.createReadStream(file.path);
      const parseFile = parse({
        delimiter: ",",
      });

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;

          categories.push({ name, description });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (error) => reject(error));
    });
  }

  async execute(file: Input) {
    const categories = await this.loadCategories(file);

    categories.forEach(async (category) => {
      const { name } = category;
      const categoryAlreadyExists = await this.categoryRepository.findByName(
        name
      );

      if (!categoryAlreadyExists) {
        await this.categoryRepository.create(category);
      }
    });
  }
}

export { ImportCategoryUseCase };
