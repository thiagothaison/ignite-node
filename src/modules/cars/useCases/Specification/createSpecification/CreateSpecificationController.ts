import { Request, Response } from "express";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    try {
      await this.createSpecificationUseCase.execute({ name, description });
    } catch (err) {
      return response.status(409).json({ message: err.message });
    }

    return response.status(201).send();
  }
}

export { CreateSpecificationController };
