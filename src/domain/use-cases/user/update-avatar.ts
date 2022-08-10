import { inject, injectable } from "tsyringe";

import { IStorageProvider } from "@domain/contracts/providers/storage";
import { IUserRepository } from "@domain/contracts/repositories/user";
import {
  IUpdateUserAvatarUseCase,
  Input,
} from "@domain/contracts/use-cases/user/update-avatar";
import { AppError } from "@domain/errors/app-error";

@injectable()
class UpdateUserAvatarUseCase implements IUpdateUserAvatarUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
    @inject("StorageProvider") private storageProvider: IStorageProvider
  ) {}

  async execute({ user: userToUpdate, avatar }: Input) {
    if (!avatar) {
      throw new AppError("Avatar does not provided");
    }

    const oldAvatar = userToUpdate.avatar;

    userToUpdate.avatar = avatar;

    const user = await this.userRepository.update(userToUpdate);

    if (oldAvatar) {
      this.storageProvider.delete(`/storage/avatars/${oldAvatar}`);
    }

    return user;
  }
}

export { UpdateUserAvatarUseCase };
