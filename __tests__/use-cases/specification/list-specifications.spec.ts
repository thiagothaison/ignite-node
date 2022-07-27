import { ISpecificationRepository } from "@domain/contracts/repositories/specification";
import { ListSpecificationsUseCase } from "@domain/use-cases/specification/list-specifications";

import { SpecificationRepository } from "@tests/repositories/specification";

let specificationRepository: ISpecificationRepository;
let listSpecificationsUseCase: ListSpecificationsUseCase;

describe("List specifications", () => {
  beforeEach(() => {
    specificationRepository = new SpecificationRepository();
    listSpecificationsUseCase = new ListSpecificationsUseCase(
      specificationRepository
    );
  });

  it("Should be able to return a empty list", async () => {
    const specifications = await listSpecificationsUseCase.execute();

    expect(specifications).toHaveLength(0);
  });

  it("Should be able to return a list", async () => {
    await specificationRepository.create({
      name: "Test",
      description: "This is a specification",
    });

    const specifications = await listSpecificationsUseCase.execute();

    expect(specifications).toHaveLength(1);
  });
});
