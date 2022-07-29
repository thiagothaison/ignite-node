import { Request, Response } from "express";
import { container } from "tsyringe";

import { AddSpecificationUseCase } from "@domain/use-cases/car/add-specification";

class AddSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { carId } = request.params;
    const { specificationIds } = request.body;
    const addSpecificationUseCase = container.resolve(AddSpecificationUseCase);

    await addSpecificationUseCase.execute({ carId, specificationIds });

    return response.status(201).send();
  }
}

export { AddSpecificationController };
