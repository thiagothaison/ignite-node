import { parse } from "csv-parse";
import fs from "fs";

import { CategoryRepository } from "~/cars/repositories/Category";
import { createCategory } from "~/cars/useCases/Category";

class ImportCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];

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

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.forEach((category) => {
      const { name } = category;
      const categoryAlreadyExists = this.categoryRepository.findByName(name);

      if (!categoryAlreadyExists) {
        this.categoryRepository.create(category);
      }
    });
  }
}

export { ImportCategoryUseCase };