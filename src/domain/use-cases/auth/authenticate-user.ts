import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import {
  jwtExpiresInMinutes,
  jwtKey,
  refreshKey,
  refreshExpiresInDays,
} from "@config/auth";

import { IDateProvider } from "@domain/contracts/providers/date-provider";
import { IUserRepository } from "@domain/contracts/repositories/user";
import { IUserTokenRepository } from "@domain/contracts/repositories/user-token";
import {
  IAuthenticateUserUseCase,
  Input,
} from "@domain/contracts/use-cases/auth/authenticate-user";
import { AppError } from "@domain/errors/app-error";

import { Type } from "@infra/typeorm/entities/user-token";

@injectable()
class AuthenticateUserUseCase implements IAuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
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

    const refreshToken = sign(
      {
        email,
      },
      refreshKey,
      {
        subject: user.id,
        expiresIn: `${refreshExpiresInDays}d`,
      }
    );

    const refreshTokenExpiresAt = this.dateProvider.addDays(
      +refreshExpiresInDays
    );

    await this.userTokenRepository.create({
      userId: user.id,
      token: refreshToken,
      expiresAt: refreshTokenExpiresAt,
      type: Type.REFRESH,
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refreshToken,
    };
  }
}

export { AuthenticateUserUseCase };
