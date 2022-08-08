import { parse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ICategoryRepository } from "@domain/contracts/repositories/category";
import {
  CsvContent,
  IImportCategoryUseCase,
  Input,
} from "@domain/contracts/use-cases/category/import";
import { AppError } from "@domain/errors/app-error";

@injectable()
class ImportCategoryUseCase implements IImportCategoryUseCase {
  private errors: CsvContent[] = [];
  private successes: CsvContent[] = [];

  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  async loadCategories(file: Input) {
    return new Promise<CsvContent[]>((resolve, reject) => {
      try {
        fs.statSync(file.path);
      } catch (err) {
        throw new AppError("Upload file does not exists");
      }

      const categories = [];

      const stream = fs.createReadStream(file.path);
      const parseFile = parse({
        delimiter: ",",
      });

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;

          if (!name || !description) {
            this.errors.push({ name, description });
            return;
          }

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

    if (!categories.length) {
      throw new AppError("This file doest have an valid list");
    }

    const promises = categories.map(async (category) => {
      const { name } = category;
      const categoryAlreadyExists = await this.categoryRepository.findByName(
        name
      );

      if (!categoryAlreadyExists) {
        await this.categoryRepository.create(category);
        this.successes.push(category);
        return;
      }

      this.errors.push(category);
    });

    await Promise.all(promises);

    if (this.successes.length === 0 && this.errors.length > 0) {
      throw new AppError("Import was not successful");
    }

    return {
      successes: this.successes,
      errors: this.errors,
    };
  }
}

export { ImportCategoryUseCase };
