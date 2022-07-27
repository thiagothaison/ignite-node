import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCarsUseCase } from "@domain/use-cases/car/list-cars";

class ListCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCarsUseCase = container.resolve(ListCarsUseCase);
    const cars = await listCarsUseCase.execute();

    return response.json(cars);
  }
}

export { ListCarsController };
