import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    try {
      const user = await authenticateUserUseCase.execute({ email, password });

      return response.json(user);
    } catch (err) {
      return response.status(404).json({
        message: err.message,
      });
    }
  }
}

export { AuthenticateUserController };
