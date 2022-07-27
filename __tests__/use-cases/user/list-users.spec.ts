import { IUserRepository } from "@domain/contracts/repositories/user";
import { ListUserUseCase } from "@domain/use-cases/user/list-users";

import { UserRepository } from "@tests/repositories/user";

let userRepository: IUserRepository;
let listUserUseCase: ListUserUseCase;

describe("List users", () => {
  beforeEach(() => {
    userRepository = new UserRepository();
    listUserUseCase = new ListUserUseCase(userRepository);
  });

  const getUsers = async () => {
    const users = listUserUseCase.execute();

    return users;
  };

  it("Should be able to return a empty list", async () => {
    const users = await getUsers();

    expect(users).toHaveLength(0);
  });

  it("Should be able to return a list", async () => {
    await userRepository.create({
      name: "John Doe",
      email: "user@domain.com",
      password: "1a2b3c!@",
      isAdmin: false,
      driverLicense: "00000000123",
    });

    const users = await getUsers();

    expect(users).toHaveLength(1);
  });
});
