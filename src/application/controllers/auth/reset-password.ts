import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResetPasswordUseCase } from "@domain/use-cases/auth/reset-password";

class ResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      body: { password, confirmPassword },
      query: { token },
    } = request;

    const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);

    await resetPasswordUseCase.execute({
      token: String(token),
      password,
      confirmPassword,
    });

    return response.status(204).send();
  }
}

export { ResetPasswordController };
