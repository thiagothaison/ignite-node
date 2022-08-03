import { inject, injectable } from "tsyringe";

import { CreateUser } from "@domain/contracts/dtos/user/create";
import { IUserRepository } from "@domain/contracts/repositories/user";
import { AppError } from "@domain/errors/app-error";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute(parameters: CreateUser.Input): CreateUser.Output {
    const { email } = parameters;

    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError(`O usuário ${email} já existe`, 409);
    }

    await this.userRepository.create(parameters);
  }
}

export { CreateUserUseCase };
