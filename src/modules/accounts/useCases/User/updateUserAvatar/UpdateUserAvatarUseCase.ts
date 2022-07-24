import { inject, injectable } from "tsyringe";

import { deleteFile } from "~/utils/file";

import { User } from "~/accounts/entities/User";
import { IUserRepository } from "~/accounts/types/repositories/User";

interface IRequest {
  user: User;
  avatar: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute({ user, avatar }: IRequest): Promise<void> {
    const oldAvatar = user.avatar;

    user.avatar = avatar;

    await this.userRepository.update(user);

    if (oldAvatar) {
      deleteFile(`./storage/avatars/${oldAvatar}`);
    }
  }
}

export { UpdateUserAvatarUseCase };
