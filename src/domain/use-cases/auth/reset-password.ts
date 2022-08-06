import { inject, injectable } from "tsyringe";

import { IDateProvider } from "@domain/contracts/providers/date-provider";
import { IUserRepository } from "@domain/contracts/repositories/user";
import { IUserTokenRepository } from "@domain/contracts/repositories/user-token";
import {
  IResetPasswordUseCase,
  Input,
} from "@domain/contracts/use-cases/auth/reset-password";
import { AppError } from "@domain/errors/app-error";

import { Type } from "@infra/typeorm/entities/user-token";

@injectable()
class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository,
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ token, password, confirmPassword }: Input): Promise<void> {
    if (!token) {
      throw new AppError("Token is not provided");
    }

    const userToken = await this.userTokenRepository.findByToken(
      token,
      Type.RECOVERY
    );

    if (!userToken) {
      throw new AppError("Token does not valid");
    }

    const compare = this.dateProvider.compare(
      this.dateProvider.now(),
      userToken.expiresAt,
      "hours"
    );

    if (compare <= 0) {
      throw new AppError("Token is expired");
    }

    if (password !== confirmPassword) {
      throw new AppError("Password does not match");
    }

    const user = await this.userRepository.findById(userToken.userId);
    user.password = password;

    await this.userRepository.update(user);

    await this.userTokenRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUseCase };
