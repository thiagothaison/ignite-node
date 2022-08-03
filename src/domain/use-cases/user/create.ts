import { inject, injectable } from "tsyringe";

import { IUserRepository } from "@domain/contracts/repositories/user";
import {
  ICreateUserUseCase,
  Input,
} from "@domain/contracts/use-cases/user/create";
import { AppError } from "@domain/errors/app-error";

@injectable()
class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute(parameters: Input) {
    const { email } = parameters;

    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError(`O usuário ${email} já existe`, 409);
    }

    await this.userRepository.create(parameters);
  }
}

export { CreateUserUseCase };
