import { sign } from "jsonwebtoken";

import { refreshExpiresInDays, refreshKey } from "@config/auth";

import { IDateProvider } from "@domain/contracts/providers/date-provider";
import { IUserRepository } from "@domain/contracts/repositories/user";
import { IUserTokenRepository } from "@domain/contracts/repositories/user-token";
import { AppError } from "@domain/errors/app-error";
import { SendRecoveryEmailUseCase } from "@domain/use-cases/auth/send-recovery-email";

import { UserRepository } from "@tests/repositories/user";
import { UserTokenRepository } from "@tests/repositories/user-token";

import { DayJsProvider } from "@infra/providers/date-provider/day-js-provider";
import { EtherealProvider } from "@infra/providers/mail/ethereal";
import { Type } from "@infra/typeorm/entities/user-token";

jest.mock("@infra/providers/mail/ethereal");

let userTokenRepository: IUserTokenRepository;
let userRepository: IUserRepository;
let dateProvider: IDateProvider;
let mailProvider: EtherealProvider;
let sendRecoveryEmailUseCase: SendRecoveryEmailUseCase;

describe("Refresh Token", () => {
  beforeEach(() => {
    userTokenRepository = new UserTokenRepository();
    userRepository = new UserRepository();
    dateProvider = new DayJsProvider();
    mailProvider = new EtherealProvider();

    sendRecoveryEmailUseCase = new SendRecoveryEmailUseCase(
      userRepository,
      userTokenRepository,
      dateProvider,
      mailProvider
    );
  });

  const getToken = (userId) =>
    sign({ email: "fake@email.com" }, refreshKey, {
      subject: userId,
      expiresIn: `${refreshExpiresInDays}d`,
    });

  const createUser = async () =>
    userRepository.create({
      driverLicense: "fake-license",
      email: "fake@email.com",
      name: "Fake User",
      password: "fake-password",
      isAdmin: false,
    });

  it("Should not be able to send recovery email if user does not exists", async () => {
    await expect(
      sendRecoveryEmailUseCase.execute({
        email: "fake@email.com",
        baseUrl: "http://fake.url",
      })
    ).rejects.toEqual(new AppError("User does not exists"));
  });

  it("Should be able to send recovery email", async () => {
    const user = await createUser();
    const token = getToken(user.id);

    await userTokenRepository.create({
      userId: user.id,
      token,
      type: Type.REFRESH,
      expiresAt: dateProvider.tomorrow(),
    });

    await sendRecoveryEmailUseCase.execute({
      email: user.email,
      baseUrl: "http://fake.url",
    });

    expect(mailProvider.send).toHaveBeenCalled();
  });
});
