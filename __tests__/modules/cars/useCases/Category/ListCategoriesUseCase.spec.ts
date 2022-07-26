import { CategoryRepository } from "~/tests/modules/cars/repositories/Category";

import { ICategoryRepository } from "~/cars/types/repositories/Category";
import { ListCategoriesUseCase } from "~/cars/useCases/Category/listCategories/ListCategoriesUseCase";

let categoryRepository: ICategoryRepository;
let listCategoriesUseCase: ListCategoriesUseCase;

describe("List categories", () => {
  beforeEach(() => {
    categoryRepository = new CategoryRepository();
    listCategoriesUseCase = new ListCategoriesUseCase(categoryRepository);
  });

  it("Should be able to return a empty list", async () => {
    const categories = await listCategoriesUseCase.execute();

    expect(categories).toHaveLength(0);
  });

  it("Should be able to return a list", async () => {
    await categoryRepository.create({
      name: "Test",
      description: "This is a description",
    });

    const categories = await listCategoriesUseCase.execute();

    expect(categories).toHaveLength(1);
  });
});
