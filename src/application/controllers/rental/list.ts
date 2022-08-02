import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRentalsUseCase } from "@domain/use-cases/rental/list-rentals";

class ListRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listRentalsUseCase = container.resolve(ListRentalsUseCase);
    const rentals = await listRentalsUseCase.execute();

    return response.status(200).json(rentals);
  }
}

export { ListRentalController };
