import { inject, injectable } from "tsyringe";

import { IUserRepository } from "@domain/contracts/repositories/user";
import {
  IUpdateUserAvatarUseCase,
  Input,
} from "@domain/contracts/use-cases/user/update-avatar";
import { deleteFile } from "@domain/helpers/file";

@injectable()
class UpdateUserAvatarUseCase implements IUpdateUserAvatarUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute({ user, avatar }: Input) {
    const oldAvatar = user.avatar;

    user.avatar = avatar;

    await this.userRepository.update(user);

    if (oldAvatar) {
      deleteFile(`./storage/avatars/${oldAvatar}`);
    }
  }
}

export { UpdateUserAvatarUseCase };
