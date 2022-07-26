import { SpecificationRepository } from "~/tests/modules/cars/repositories/Specification";

import { ISpecificationRepository } from "~/cars/types/repositories/Specification";
import { ListSpecificationsUseCase } from "~/cars/useCases/Specification/listSpecifications/ListSpecificationsUseCase";

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
