import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "@domain/use-cases/user/create-user";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, driverLicense, isAdmin } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      email,
      password,
      driverLicense,
      isAdmin,
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
