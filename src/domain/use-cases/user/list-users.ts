import { inject, injectable } from "tsyringe";

import { IUserRepository } from "@domain/contracts/repositories/user";

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
