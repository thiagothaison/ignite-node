import { IDateProvider } from "@domain/contracts/providers/date-provider";
import { IUserRepository } from "@domain/contracts/repositories/user";
import { IUserTokenRepository } from "@domain/contracts/repositories/user-token";
import { AppError } from "@domain/errors/app-error";
import { AuthenticateUserUseCase } from "@domain/use-cases/auth/authenticate-user";
import { CreateUserUseCase } from "@domain/use-cases/user/create";

import { UserRepository } from "@tests/repositories/user";
import { UserTokenRepository } from "@tests/repositories/user-token";

import { DayJsProvider } from "@infra/providers/date-provider/day-js-provider";

let userRepository: IUserRepository;
let userTokenRepository: IUserTokenRepository;
let dateProvider: IDateProvider;

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    userRepository = new UserRepository();
    userTokenRepository = new UserTokenRepository();
    dateProvider = new DayJsProvider();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepository,
      userTokenRepository,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  const createUser = async () => {
    const user = {
      email: "user@domain.com",
      password: "1a2b3c!@",
      name: "John Doe",
      driverLicense: "0000002547",
      isAdmin: false,
    };

    await createUserUseCase.execute(user);

    return user;
  };

  it("Should be to authenticate an user", async () => {
    const user = await createUser();

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("Should not be able to authenticate an user with wrong password", async () => {
    const user = await createUser();

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "wrong-password",
      })
    ).rejects.toEqual(new AppError("Usuário ou senha inválido", 422));
  });

  it("Should not be able to authenticate an user with wrong email", async () => {
    await createUser();

    await expect(
      authenticateUserUseCase.execute({
        email: "wrong@email.com",
        password: "wrong-password",
      })
    ).rejects.toEqual(new AppError("Usuário ou senha inválido", 422));
  });
});
