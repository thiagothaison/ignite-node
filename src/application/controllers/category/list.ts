import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoriesUseCase } from "@domain/use-cases/category/list";

class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
    const categories = await listCategoriesUseCase.execute();

    return response.json(categories);
  }
}

export { ListCategoriesController };
