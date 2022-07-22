import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, driverLicense, isAdmin } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    try {
      await createUserUseCase.execute({
        name,
        email,
        password,
        driverLicense,
        isAdmin,
      });
    } catch (err) {
      return response.status(409).json({ message: err.message });
    }

    return response.status(201).send();
  }
}

export { CreateUserController };
