import { Request, Response } from "express";
import { container } from "tsyringe";

import { ProfileUseCase } from "@domain/use-cases/user/profile";

class ProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listUserUseCase = container.resolve(ProfileUseCase);
    const user = await listUserUseCase.execute(request.user.id);

    return response.json(user);
  }
}

export { ProfileController };
