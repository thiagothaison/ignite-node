import { ICategoryRepository } from "@domain/contracts/repositories/category";
import { AppError } from "@domain/errors/app-error";
import { CreateCategoryUseCase } from "@domain/use-cases/category/create";

import { CategoryRepository } from "@tests/repositories/category";

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

  it("Should not be able to create a new category with existing name", async () => {
    const name = "Duplicated";

    await createCategoryUseCase.execute({
      name,
      description: "This is a description",
    });

    await expect(
      createCategoryUseCase.execute({
        name,
        description: "This is a description",
      })
    ).rejects.toEqual(new AppError(`A categoria ${name} já existe.`, 409));
  });
});
