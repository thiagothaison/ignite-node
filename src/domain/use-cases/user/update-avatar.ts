import { inject, injectable } from "tsyringe";

import { UpdateAvatar } from "@domain/contracts/dtos/user/update-avatar";
import { IUserRepository } from "@domain/contracts/repositories/user";
import { deleteFile } from "@domain/utils/file";

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute({ user, avatar }: UpdateAvatar.Input): UpdateAvatar.Output {
    const oldAvatar = user.avatar;

    user.avatar = avatar;

    await this.userRepository.update(user);

    if (oldAvatar) {
      deleteFile(`./storage/avatars/${oldAvatar}`);
    }
  }
}

export { UpdateUserAvatarUseCase };
