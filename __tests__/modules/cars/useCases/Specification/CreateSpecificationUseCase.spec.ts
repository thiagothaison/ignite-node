import { SpecificationRepository } from "~/tests/modules/cars/repositories/Specification";

import { AppError } from "~/errors/AppError";

import { ISpecificationRepository } from "~/cars/types/repositories/Specification";
import { CreateSpecificationUseCase } from "~/cars/useCases/Specification/createSpecification/CreateSpecificationUseCase";

let specificationRepository: ISpecificationRepository;
let createSpecificationUseCase: CreateSpecificationUseCase;

describe("Create an specification", () => {
  beforeEach(() => {
    specificationRepository = new SpecificationRepository();
    createSpecificationUseCase = new CreateSpecificationUseCase(
      specificationRepository
    );
  });

  it("Should be able to create a new specification", async () => {
    const name = "Test";
    await createSpecificationUseCase.execute({
      name,
      description: "This is a test",
    });

    const specification = await specificationRepository.findByName(name);

    expect(specification).toHaveProperty("id");
  });

  it("Should not be able to create a new specification with existing name", () => {
    return expect(async () => {
      const name = "Duplicated";
      await createSpecificationUseCase.execute({
        name,
        description: "This is a test",
      });

      await createSpecificationUseCase.execute({
        name,
        description: "This is a test",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
