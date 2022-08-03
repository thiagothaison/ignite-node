import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRentalUseCase } from "@domain/use-cases/rental/create";

class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createRentalUseCase = container.resolve(CreateRentalUseCase);
    const { carId, expectedEndAt } = request.body;
    const parameters = {
      carId,
      userId: request.user.id,
      expectedEndAt,
    };

    const rental = await createRentalUseCase.execute(parameters);

    return response.status(201).json(rental);
  }
}

export { CreateRentalController };
