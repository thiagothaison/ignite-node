import { parse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ImportCategory } from "@domain/contracts/dtos/category/import";
import { ICategoryRepository } from "@domain/contracts/repositories/category";

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  async loadCategories(
    file: ImportCategory.Input
  ): Promise<ImportCategory.CsvContent[]> {
    return new Promise((resolve, reject) => {
      const categories: ImportCategory.CsvContent[] = [];

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

  async execute(file: ImportCategory.Input): Promise<ImportCategory.Output> {
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
