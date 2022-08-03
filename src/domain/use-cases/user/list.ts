import { inject, injectable } from "tsyringe";

import { ListUsers } from "@domain/contracts/dtos/user/list-users";
import { IUserRepository } from "@domain/contracts/repositories/user";

@injectable()
class ListUserUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute(): ListUsers.Output {
    return this.userRepository.list();
  }
}

export { ListUserUseCase };
