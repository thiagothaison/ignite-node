import { inject, injectable } from "tsyringe";

import { IUserRepository } from "@domain/contracts/repositories/user";
import {
  IUpdateUserAvatarUseCase,
  Input,
} from "@domain/contracts/use-cases/user/update-avatar";
import { AppError } from "@domain/errors/app-error";
import { deleteFile } from "@domain/helpers/file";

@injectable()
class UpdateUserAvatarUseCase implements IUpdateUserAvatarUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute({ user: userToUpdate, avatar }: Input) {
    if (!avatar) {
      throw new AppError("Avatar does not provided");
    }

    const oldAvatar = userToUpdate.avatar;

    userToUpdate.avatar = avatar;

    const user = await this.userRepository.update(userToUpdate);

    if (oldAvatar) {
      deleteFile(`./storage/avatars/${oldAvatar}`);
    }

    return user;
  }
}

export { UpdateUserAvatarUseCase };
