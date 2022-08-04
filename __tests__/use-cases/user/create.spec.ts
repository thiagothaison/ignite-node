import { IUserRepository } from "@domain/contracts/repositories/user";
import { AppError } from "@domain/errors/app-error";
import { CreateUserUseCase } from "@domain/use-cases/user/create";

import { UserRepository } from "@tests/repositories/user";

let userRepository: IUserRepository;
let createUserUseCase: CreateUserUseCase;

describe("Create user", () => {
  beforeEach(() => {
    userRepository = new UserRepository();
    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  const createUser = async () => {
    const email = "user@domain.com";

    await createUserUseCase.execute({
      name: "John Doe",
      email,
      password: "1a2b3c!@",
      isAdmin: false,
      driverLicense: "00000000123",
    });

    const user = await userRepository.findByEmail("user@domain.com");

    return user;
  };

  it("Should be able to create a new user", async () => {
    const user = await createUser();

    expect(user).toHaveProperty("id");
  });

  it("Should not be able to create a new user with existing email", async () => {
    return expect(async () => {
      await createUser();

      await createUser();
    }).rejects.toBeInstanceOf(AppError);
  });
});
