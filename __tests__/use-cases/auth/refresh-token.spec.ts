import { sign } from "jsonwebtoken";

import { refreshExpiresInDays, refreshKey } from "@config/auth";

import { IDateProvider } from "@domain/contracts/providers/date-provider";
import { IUserRepository } from "@domain/contracts/repositories/user";
import { IUserTokenRepository } from "@domain/contracts/repositories/user-token";
import { AppError } from "@domain/errors/app-error";
import { RefreshTokenUseCase } from "@domain/use-cases/auth/refresh-token";

import { UserRepository } from "@tests/repositories/user";
import { UserTokenRepository } from "@tests/repositories/user-token";

import { DayJsProvider } from "@infra/providers/date-provider/day-js-provider";
import { Type } from "@infra/typeorm/entities/user-token";

let userTokenRepository: IUserTokenRepository;
let userRepository: IUserRepository;
let dateProvider: IDateProvider;
let refreshTokenUseCase: RefreshTokenUseCase;

describe("Refresh Token", () => {
  beforeEach(() => {
    userTokenRepository = new UserTokenRepository();
    userRepository = new UserRepository();
    dateProvider = new DayJsProvider();

    refreshTokenUseCase = new RefreshTokenUseCase(
      userTokenRepository,
      userRepository,
      dateProvider
    );
  });

  const getToken = (userId) =>
    sign({ email: "fake@email.com" }, refreshKey, {
      subject: userId,
      expiresIn: `${refreshExpiresInDays}d`,
    });

  it("Should not be able to refresh token if the refresh_token is invalid", async () => {
    await expect(
      refreshTokenUseCase.execute({ refreshToken: "fake-refresh-token" })
    ).rejects.toEqual(new AppError("Invalid refresh token", 401));
  });

  it("Should not be able to refresh token if the refresh_token does not exists", async () => {
    const refreshToken = getToken("fake-user-id");

    await expect(refreshTokenUseCase.execute({ refreshToken })).rejects.toEqual(
      new AppError("Refresh token does not exists")
    );
  });

  it("Should not be able to refresh token if the refresh_token is from another user", async () => {
    const refreshToken = getToken("fake-user-id");

    await userTokenRepository.create({
      userId: "fake-another-user-id",
      token: refreshToken,
      type: Type.REFRESH,
      expiresAt: dateProvider.tomorrow(),
    });

    await expect(refreshTokenUseCase.execute({ refreshToken })).rejects.toEqual(
      new AppError("Refresh token is invalid")
    );
  });

  it("Should be able to refresh token", async () => {
    const user = await userRepository.create({
      driverLicense: "fake-license",
      email: "fake@email.com",
      name: "Fake User",
      password: "fake-password",
      isAdmin: false,
    });

    const oldRefreshToken = getToken(user.id);

    await userTokenRepository.create({
      userId: user.id,
      token: oldRefreshToken,
      type: Type.REFRESH,
      expiresAt: dateProvider.tomorrow(),
    });

    const refreshToken = await refreshTokenUseCase.execute({
      refreshToken: oldRefreshToken,
    });

    expect(refreshToken).toHaveProperty("token");
    expect(refreshToken).toHaveProperty("refreshToken");
  });
});
