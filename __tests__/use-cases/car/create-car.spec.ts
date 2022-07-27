import { CreateCarUseCase } from "@domain/use-cases/car/create-car";

let createCarUseCase: CreateCarUseCase;

describe("Create car", () => {
  beforeEach(() => {
    createCarUseCase = new CreateCarUseCase();
  });

  it("Should be able to create a new car", async () => {
    await createCarUseCase.execute();
  });
});
