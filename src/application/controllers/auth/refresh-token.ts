import { Request, Response } from "express";
import { container } from "tsyringe";

import { RefreshTokenUseCase } from "@domain/use-cases/auth/refresh-token";

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const refreshToken = request.headers["x-access-token"];
    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const user = await refreshTokenUseCase.execute({
      refreshToken: refreshToken as string,
    });

    return response.json(user);
  }
}

export { RefreshTokenController };
