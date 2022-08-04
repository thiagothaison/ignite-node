import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRentalsUseCase } from "@domain/use-cases/rental/list";

class ListRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      user: { id: userId },
    } = request;

    const listRentalsUseCase = container.resolve(ListRentalsUseCase);
    const rentals = await listRentalsUseCase.execute({ userId });

    return response.status(200).json(rentals);
  }
}

export { ListRentalController };
