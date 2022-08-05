import { Request, Response } from "express";
import { container } from "tsyringe";

import { SendRecoveryEmailUseCase } from "@domain/use-cases/auth/send-recovery-email";

class SendRecoveryEmailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendRecoveryEmailUseCase = container.resolve(
      SendRecoveryEmailUseCase
    );

    const baseUrl = `${request.protocol}://${request.get("host")}`;

    await sendRecoveryEmailUseCase.execute({ email, baseUrl });

    return response.status(204).send();
  }
}

export { SendRecoveryEmailController };
