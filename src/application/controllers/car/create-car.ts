import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarUseCase } from "@domain/use-cases/car/create-car";

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      categoryId,
      name,
      description,
      dailyRate,
      available,
      licensePlate,
      fineAmount,
      brand,
    } = request.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);
    await createCarUseCase.execute({
      categoryId,
      name,
      description,
      dailyRate,
      available,
      licensePlate,
      fineAmount,
      brand,
    });

    return response.status(201).send();
  }
}

export { CreateCarController };
