import { inject, injectable } from "tsyringe";

import { IUserRepository } from "@domain/contracts/repositories/user";
import { IListUserUseCase } from "@domain/contracts/use-cases/user/list";

@injectable()
class ListUserUseCase implements IListUserUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute() {
    return this.userRepository.list();
  }
}

export { ListUserUseCase };
