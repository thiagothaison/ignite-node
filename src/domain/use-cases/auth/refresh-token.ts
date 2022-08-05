import { JsonWebTokenError, sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import {
  jwtExpiresInMinutes,
  jwtKey,
  refreshExpiresInDays,
  refreshKey,
} from "@config/auth";

import { IDateProvider } from "@domain/contracts/providers/date-provider";
import { IUserTokenRepository } from "@domain/contracts/repositories/user-token";
import {
  IRefreshTokenUseCase,
  Input,
} from "@domain/contracts/use-cases/auth/refresh-token";
import { AppError } from "@domain/errors/app-error";

import { Type } from "@infra/typeorm/entities/user-token";

@injectable()
class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor(
    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ refreshToken: userRefreshToken }: Input) {
    try {
      const { sub: userId } = verify(userRefreshToken, refreshKey);

      const oldRefreshToken = await this.userTokenRepository.findByToken(
        userRefreshToken,
        Type.REFRESH
      );

      if (!oldRefreshToken) {
        throw new AppError("Refresh token does not exists");
      }

      if (userId !== oldRefreshToken.userId) {
        throw new AppError("Refresh token is invalid");
      }

      const {
        user: { email },
      } = oldRefreshToken;

      const token = sign({}, jwtKey, {
        subject: userId,
        expiresIn: `${jwtExpiresInMinutes}m`,
      });

      const refreshToken = sign(
        {
          email,
        },
        refreshKey,
        {
          subject: userId,
          expiresIn: `${refreshExpiresInDays}d`,
        }
      );

      const refreshTokenExpiresAt = this.dateProvider.addDays(
        +refreshExpiresInDays
      );

      await this.userTokenRepository.deleteById(oldRefreshToken.id);

      await this.userTokenRepository.create({
        userId,
        token: refreshToken,
        expiresAt: refreshTokenExpiresAt,
        type: Type.REFRESH,
      });

      return {
        token,
        refreshToken,
      };
    } catch (err) {
      if (err instanceof JsonWebTokenError) {
        throw new AppError("Invalid refresh token", 401);
      }

      throw new AppError(err.message);
    }
  }
}

export { RefreshTokenUseCase };
