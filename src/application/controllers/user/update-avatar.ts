import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUseCase } from "@domain/use-cases/user/update-avatar";

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      user,
      file: { filename: avatar },
    } = request;

    console.log(request.file);

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({ user, avatar });

    return response.status(204).send();
  }
}

export { UpdateUserAvatarController };
