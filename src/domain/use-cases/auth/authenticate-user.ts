import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AuthenticateUser } from "@domain/contracts/dtos/auth/authenticate-user";
import { IUserRepository } from "@domain/contracts/repositories/user";
import { AppError } from "@domain/errors/app-error";

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUser.Input): Promise<AuthenticateUser.Output> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Usuário ou senha inválido", 422);
    }

    const isPasswordMatch = compareSync(password, user.password);

    if (!isPasswordMatch) {
      throw new AppError("Usuário ou senha inválido", 422);
    }

    const token = sign({}, process.env.JWT_KEY, {
      subject: user.id,
      expiresIn: "1d",
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}

export { AuthenticateUserUseCase };
