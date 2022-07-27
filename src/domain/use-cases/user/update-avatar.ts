import { inject, injectable } from "tsyringe";

import { IUserRepository } from "@domain/contracts/repositories/user";
import { deleteFile } from "@domain/utils/file";

import { User } from "@infra/typeorm/entities/user";

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
