import { CategoryRepository } from "~/tests/modules/cars/repositories/Category";

import { AppError } from "~/errors/AppError";

import { ICategoryRepository } from "~/cars/types/repositories/Category";
import { CreateCategoryUseCase } from "~/cars/useCases/Category/createCategory/CreateCategoryUseCase";

let categoryRepository: ICategoryRepository;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Create an category", () => {
  beforeEach(() => {
    categoryRepository = new CategoryRepository();
    createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
  });

  it("Should be able to create a new category", async () => {
    const name = "Test";
    await createCategoryUseCase.execute({
      name,
      description: "This is a description",
    });

    const category = await categoryRepository.findByName(name);

    expect(category).toHaveProperty("id");
  });

  it("Should not be able to create a new category with existing name", () => {
    expect(async () => {
      const name = "Duplicated";

      await createCategoryUseCase.execute({
        name,
        description: "This is a description",
      });

      await createCategoryUseCase.execute({
        name,
        description: "This is a description",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
