import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { jwtExpiresInMinutes, jwtKey } from "@config/auth";

import { IUserRepository } from "@domain/contracts/repositories/user";
import {
  IAuthenticateUserUseCase,
  Input,
} from "@domain/contracts/use-cases/auth/authenticate-user";
import { AppError } from "@domain/errors/app-error";

@injectable()
class AuthenticateUserUseCase implements IAuthenticateUserUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute({ email, password }: Input) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Usuário ou senha inválido", 422);
    }

    const isPasswordMatch = compareSync(password, user.password);

    if (!isPasswordMatch) {
      throw new AppError("Usuário ou senha inválido", 422);
    }

    const token = sign({}, jwtKey, {
      subject: user.id,
      expiresIn: `${jwtExpiresInMinutes}m`,
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
