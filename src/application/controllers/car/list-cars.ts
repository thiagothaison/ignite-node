import { Request, Response } from "express";
import { container } from "tsyringe";

import { onlyQuery } from "@application/helpers/only-query";

import { ListCarsUseCase } from "@domain/use-cases/car/list-cars";

class ListCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const filter = onlyQuery(request, [
      "name",
      "brand",
      "available",
      "categoryId",
    ]);

    const listCarsUseCase = container.resolve(ListCarsUseCase);
    const cars = await listCarsUseCase.execute(filter);

    return response.json(cars);
  }
}

export { ListCarsController };
