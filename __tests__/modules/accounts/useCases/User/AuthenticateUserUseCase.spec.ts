import { UserRepository } from "~/tests/modules/accounts/repositories/User";

import { IUserRepository } from "~/accounts/types/repositories/User";
import { AuthenticateUserUseCase } from "~/accounts/useCases/User/authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "~/accounts/useCases/User/createUser/CreateUserUseCase";

import { AppError } from "../../../../../src/errors/AppError";

let userRepository: IUserRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    userRepository = new UserRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  const createUser = async (): Promise<ICreateUserDTO> => {
    const user: ICreateUserDTO = {
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

  it("Should not be able to authenticate an user with wrong password", () => {
    return expect(async () => {
      const user = await createUser();

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "wrong-password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to authenticate an user with wrong email", () => {
    return expect(async () => {
      await createUser();

      await authenticateUserUseCase.execute({
        email: "wrong@email.com",
        password: "wrong-password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
