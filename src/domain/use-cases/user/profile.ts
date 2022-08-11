import { inject, injectable } from "tsyringe";

import { UserMap } from "@application/transformers/user";

import { IUserRepository } from "@domain/contracts/repositories/user";
import { IProfileUseCase } from "@domain/contracts/use-cases/user/profile";

@injectable()
class ProfileUseCase implements IProfileUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);

    return UserMap.transform(user);
  }
}

export { ProfileUseCase };
