import { inject, injectable } from "tsyringe";

import { AppError } from "~/errors/AppError";

import { IUserRepository } from "~/accounts/types/repositories/User";

interface IRequest {
  name: string;
  email: string;
  password: string;
  driverLicense: string;
  isAdmin: boolean;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute({ name, email, password, driverLicense, isAdmin }: IRequest) {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError(`O usuário ${email} já existe`, 409);
    }

    await this.userRepository.create({
      name,
      email,
      password,
      driverLicense,
      isAdmin,
    });
  }
}

export { CreateUserUseCase };
