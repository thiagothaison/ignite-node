import { IUserRepository } from "@domain/contracts/repositories/user";
import { AppError } from "@domain/errors/app-error";
import { deleteFile } from "@domain/helpers/file";
import { UpdateUserAvatarUseCase } from "@domain/use-cases/user/update-avatar";

import { UserRepository } from "@tests/repositories/user";

let userRepository: IUserRepository;
let updateAvatarUseCase: UpdateUserAvatarUseCase;

jest.mock("@domain/helpers/file");

describe("Create user", () => {
  beforeEach(() => {
    userRepository = new UserRepository();
    updateAvatarUseCase = new UpdateUserAvatarUseCase(userRepository);
  });

  const createUser = async () => {
    const email = "user@domain.com";

    const user = await userRepository.create({
      name: "John Doe",
      email,
      password: "1a2b3c!@",
      isAdmin: false,
      driverLicense: "00000000123",
      avatar: "fake-avatar",
    });

    return user;
  };

  it("Should not be able to update a user avatar if a file is not provided", async () => {
    const user = await createUser();

    await expect(
      updateAvatarUseCase.execute({ user, avatar: null })
    ).rejects.toEqual(new AppError("Avatar does not provided"));
  });

  it("Should be able to update a user avatar", async () => {
    const user = await updateAvatarUseCase.execute({
      user: await createUser(),
      avatar: "new-file.png",
    });

    expect(user.avatar).toBe("new-file.png");
    expect(deleteFile).toHaveBeenCalled();
  });
});
