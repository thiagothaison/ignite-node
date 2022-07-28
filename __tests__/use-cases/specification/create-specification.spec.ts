import { ISpecificationRepository } from "@domain/contracts/repositories/specification";
import { AppError } from "@domain/errors/app-error";
import { CreateSpecificationUseCase } from "@domain/use-cases/specification/create-specification";

import { SpecificationRepository } from "@tests/repositories/specification";

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