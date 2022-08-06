import { sign } from "jsonwebtoken";

import { refreshExpiresInDays, refreshKey } from "@config/auth";

import { IDateProvider } from "@domain/contracts/providers/date-provider";
import { IUserRepository } from "@domain/contracts/repositories/user";
import { IUserTokenRepository } from "@domain/contracts/repositories/user-token";
import { AppError } from "@domain/errors/app-error";
import { ResetPasswordUseCase } from "@domain/use-cases/auth/reset-password";

import { UserRepository } from "@tests/repositories/user";
import { UserTokenRepository } from "@tests/repositories/user-token";

import { DayJsProvider } from "@infra/providers/date-provider/day-js-provider";
import { Type } from "@infra/typeorm/entities/user-token";

let userTokenRepository: IUserTokenRepository;
let userRepository: IUserRepository;
let dateProvider: IDateProvider;
let resetPasswordUseCase: ResetPasswordUseCase;

describe("Refresh Token", () => {
  beforeEach(() => {
    userTokenRepository = new UserTokenRepository();
    userRepository = new UserRepository();
    dateProvider = new DayJsProvider();

    resetPasswordUseCase = new ResetPasswordUseCase(
      userTokenRepository,
      userRepository,
      dateProvider
    );
  });

  const generateToken = (userId, invalid = false) =>
    sign({ email: "fake@email.com" }, refreshKey, {
      subject: userId,
      expiresIn: invalid ? "-1d" : `${refreshExpiresInDays}d`,
    });

  const saveToken = async (userId, token, expiresAt) =>
    userTokenRepository.create({
      userId,
      token,
      type: Type.RECOVERY,
      expiresAt,
    });

  const createUser = async () =>
    userRepository.create({
      driverLicense: "fake-license",
      email: "fake@email.com",
      name: "Fake User",
      password: "fake-password",
      isAdmin: false,
    });

  it("Should not be able to reset the user's password if token does not provided", async () => {
    await expect(
      resetPasswordUseCase.execute({
        token: null,
        password: "fake-pwd",
        confirmPassword: "fake-pwd",
      })
    ).rejects.toEqual(new AppError("Token is not provided"));
  });

  it("Should not be able to reset the user's password if token does not valid", async () => {
    const token = generateToken("fake-user-id");

    await expect(
      resetPasswordUseCase.execute({
        token,
        password: "fake-pwd",
        confirmPassword: "fake-pwd",
      })
    ).rejects.toEqual(new AppError("Token does not valid"));
  });

  it("Should not be able to reset the user's password if token is expired", async () => {
    const token = generateToken("fake-user-id", true);

    await saveToken("fake-user-id", token, dateProvider.yesterday());

    await expect(
      resetPasswordUseCase.execute({
        token,
        password: "fake-pwd",
        confirmPassword: "fake-pwd",
      })
    ).rejects.toEqual(new AppError("Token is expired"));
  });

  it("Should not be able to reset the user's password if the entered passwords do not match", async () => {
    const token = generateToken("fake-user-id");

    await saveToken("fake-user-id", token, dateProvider.tomorrow());

    await expect(
      resetPasswordUseCase.execute({
        token,
        password: "fake-pwd",
        confirmPassword: "fake-pwd-wrong",
      })
    ).rejects.toEqual(new AppError("Password does not match"));
  });

  it("Should be able to reset the user's password", async () => {
    const fakePassword = "fake-pwd";

    const user = await createUser();

    const token = generateToken(user.id);

    await saveToken(user.id, token, dateProvider.tomorrow());

    await resetPasswordUseCase.execute({
      token,
      password: fakePassword,
      confirmPassword: fakePassword,
    });

    const refreshToken = await userTokenRepository.findByToken(
      token,
      Type.RECOVERY
    );

    const userUpdated = await userRepository.findById(user.id);

    expect(refreshToken).toBeUndefined();
    expect(userUpdated.password).toBe(fakePassword);
  });
});
