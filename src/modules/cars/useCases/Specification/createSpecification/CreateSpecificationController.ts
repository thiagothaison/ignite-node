import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createSpecificationUseCase = container.resolve(
      CreateSpecificationUseCase
    );

    try {
      await createSpecificationUseCase.execute({ name, description });
    } catch (err) {
      return response.status(409).json({ message: err.message });
    }

    return response.status(201).send();
  }
}

export { CreateSpecificationController };
