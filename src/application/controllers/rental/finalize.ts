import { Request, Response } from "express";
import { container } from "tsyringe";

import { FinalizeRentalUseCase } from "@domain/use-cases/rental/finalize";

class FinalizeRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      params: { id },
      user: { id: userId },
    } = request;

    const finalizeRentalUseCase = container.resolve(FinalizeRentalUseCase);

    const rental = await finalizeRentalUseCase.execute({ id, userId });

    return response.json(rental).send();
  }
}

export { FinalizeRentalController };
