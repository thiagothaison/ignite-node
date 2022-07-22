import { inject, injectable } from "tsyringe";

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
      throw new Error(`O usuário ${email} já existe`);
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
