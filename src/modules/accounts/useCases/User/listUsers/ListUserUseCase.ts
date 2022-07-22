import { IUserRepository } from "~/accounts/types/repositories/User";

import { inject, injectable } from "tsyringe";

@injectable()
class ListUserUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute() {
    return this.userRepository.list();
  }
}

export { ListUserUseCase };
